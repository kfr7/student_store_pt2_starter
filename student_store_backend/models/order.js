const db = require("../db")
// maybe need two below
// const bcrypt = require("bcrypt")
// require("dotenv").config()

class Order {
    static async listOrdersForUser(userId) {
        // I assume this will have to take a user id parameter, but we will see
        // then use the where clause to filter out the appropriate orders
        pass
        // const text = `SELECT * FROM products`;
        // const values = [];
        // const result = await db.query(text, values);
        // return result.rows;  // this is the array of all products that returned
    }

    static async createOrder(userId, order) {
        // order argument should be an object with all required fields necessary
        // to create an order
        // then create it for that user by using
        // INSERT INTO ... VALUES... and not too sure on what to return.
        pass
    }

}

module.exports = Order