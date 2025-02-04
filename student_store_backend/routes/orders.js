const express = require("express")
const Order = require("../models/order")
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals
        const orders = await Order.listOrdersForUser(user)
        res.status(200).json({"orders": orders})
    }
    catch(error) {
        next(error)
    }
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals
        const order = await Order.createOrder(user, req.body)
        res.status(201).json({order})
    }
    catch(error) {
        next(error)
    }
})

module.exports = router