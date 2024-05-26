const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('products');
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json(order)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
};

const createOrder = async (req, res) => {
    const { orderNumber, customerName, customerEmail, products, totalAmount, status } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const newOrder = new Order({
            orderNumber,
            customerName,
            customerEmail,
            products,
            totalAmount,
            status,
        })
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const updateOrder = async (req, res) => {
    const { id } = req.params
    const { orderNumber, customerName, customerEmail, products, totalAmount, status } = req.body
    if (Array.isArray(products)) {
        try {
            for (let productId of products) {
                // Check if supplierId is a valid ObjectId
                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    return res.status(400).json({ msg: `Invalid supplier ID: ${productId}` })
                }
                // Find the supplier by ID
                const product = await Product.findById(productId)
                if (!product) {
                    return res.status(404).json({ msg: `Supplier with id ${productId} not found` })
                }
            }
        } catch (err) {
            console.error(err.message)
            return res.status(500).send("Server error")
        }
    }


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { orderNumber, customerName, customerEmail, products, totalAmount, status },
            { new: true }
        )
        if (!updatedOrder) {
            return res.status(404).json({ msg: "Order not found" })
        }
        res.json(updatedOrder)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json({ msg: "Order successfully deleted" })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
}
