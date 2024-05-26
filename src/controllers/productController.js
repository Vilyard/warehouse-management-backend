const Product = require('../models/productModel')
const Supplier = require('../models/supplierModel')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const createProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, description, price, category, sku, suppliers, quantity } = req.body
    try {
        const product = new Product({ name, description, price, category, sku, suppliers, quantity })
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('suppliers')
        res.status(200).json(products)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id).populate('suppliers')
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, price, category, sku, suppliers, quantity } = req.body
    // Check if suppliers is an array and each value is a valid ObjectId
    if (Array.isArray(suppliers)) {
        try {
            for (let supplierId of suppliers) {
                // Check if supplierId is a valid ObjectId
                if (!mongoose.Types.ObjectId.isValid(supplierId)) {
                    return res.status(400).json({ msg: `Invalid supplier ID: ${supplierId}` })
                }
                // Find the supplier by ID
                const supplier = await Supplier.findById(supplierId)
                if (!supplier) {
                    return res.status(404).json({ msg: `Supplier with id ${supplierId} not found` })
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
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, sku, suppliers, quantity },
            { new: true }
        )
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.json(updatedProduct)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(200).json({ msg: "Product successfully deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}