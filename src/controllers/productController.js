const Product = require('../models/productModel');
const Supplier = require('../models/supplierModel');

const createProduct = async (req, res) => {
    const { name, description, price, category, sku, suppliers, quantity } = req.body
    try {
        const product = new Product({ name, description, price, category, sku, suppliers, quantity })
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('suppliers')
        res.status(200).json(products)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
};

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
};

const updateProduct = async (req, res) => {
    const { id } = req.params
    const updateFields = req.body

    if (updateFields.suppliers) {
        for (let supplierId of updateFields.suppliers) {
            const supplier = await Supplier.findById(supplierId)
            if (!supplier) {
                return res.status(404).json({ msg: `Supplier with id ${supplierId} not found` })
            }
        }
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updateFields, { new: true })
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
};

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
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
