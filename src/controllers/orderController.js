const Order = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.productId');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('products.productId');
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const createOrder = async (req, res) => {
    const { orderNumber, customerName, customerEmail, products, totalAmount, status } = req.body;
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Invalid status" });
    }

    try {
        const newOrder = new Order({
            orderNumber,
            customerName,
            customerEmail,
            products,
            totalAmount,
            status,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

    if (updateFields.status && !validStatuses.includes(updateFields.status)) {
        return res.status(400).json({ msg: "Invalid status" });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json({ msg: "Order successfully deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
