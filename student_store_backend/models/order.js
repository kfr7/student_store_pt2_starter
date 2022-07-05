const db = require("../db")

// maybe need two below
// const bcrypt = require("bcrypt")
// require("dotenv").config()

class Order {
    static async listOrdersForUser(user) {
        const requiredFields = ["id"]
        requiredFields.forEach((property) => {
        if (!user.hasOwnProperty(property)) {
            throw new BadRequestError(`Missing ${property} in request body.`)
        }
        }) 

        let text = `SELECT o.id AS 'orderId', o.customer_id AS 'customerId', od.quantity AS 'quantity', p.name AS 'name', p.price AS 'price'
        FROM orders AS 'o'
        INNER JOIN order_details AS 'od' ON o.id = od.order_id
        INNER JOIN products AS 'p' ON p.id = od.product_id
        WHERE o.customer_id=$1;`;
        let values = [user.id];
        let result = await db.query(text, values);
        return result.rows[0]
        // I assume this will have to take a user id parameter, but we will see
        // then use the where clause to filter out the appropriate orders
        // const text = `SELECT * FROM products`;
        // const values = [];
        // const result = await db.query(text, values);
        // return result.rows;  // this is the array of all products that returned
    }

    static async createOrder(user, order) {
        const requiredFields = ["customerId"]
        requiredFields.forEach((property) => {
        if (!order.hasOwnProperty(property)) {
            throw new BadRequestError(`Missing ${property} in request body.`)
        }
        })  
        let text = `INSERT INTO orders (customer_id)
        VALUES ($1)
        RETURNING id, customer_id;`;
        let values = [order.customerId];
        let result = await db.query(text, values);
        const newOrder = result.rows[0]
        const orderId = result.rows[0].customer_id

        order.shoppingCart.forEach(async (productIdAndQuantity) => {
            text =  `INSERT INTO order_details (order_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING order_id, product_id, quantity;`;
            values = [orderId, productIdAndQuantity.id, productIdAndQuantity.quantity]
            result = await db.query(text, values)
        })
        return newOrder
    }

}

module.exports = Order