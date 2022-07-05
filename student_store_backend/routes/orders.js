const express = require("express")
const Order = require("../models/order")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        // ADD something to parameter like req.body.userId or something
        const orders = await Order.listOrdersForUser()
        res.status(200).json({"products": products})
    }
    catch(error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        // ADD something to parameter like req.body.userId or something
        const orders = await Order.listOrdersForUser()
        res.status(200).json({"products": products})
    }
    catch(error) {
        next(error)
    }
})

module.exports = router