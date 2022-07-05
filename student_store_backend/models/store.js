const db = require("../db")
// maybe need two below
// const bcrypt = require("bcrypt")
// require("dotenv").config()

class Store {
    static async listProducts() {
        const text = `SELECT * FROM products`;
        const values = [];
        const result = await db.query(text, values);
        return result.rows;  // this is the array of all products that returned
    }
}

module.exports = Store