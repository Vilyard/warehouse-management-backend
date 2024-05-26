const Inventory = require('../models/inventoryModel')
const Product = require ('../models/productModel')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const getAllInventoryItems = async (req,res) => {
    try{
        const InventoryItems = await Inventory.find().populate('product')
        res.json(InventoryItems)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const getInventoryItemById = async (req,res) => {
    const { id } = req.params
    try{
        const InventoryItem = await Inventory.findById(id).populate('product')
        if(!InventoryItem){
            return res.status(404).json({msg: "Inventory item not found"})
        }
        res.json(InventoryItem)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const createInventoryItem = async(req,res) =>{
    const {product, quantity, location} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const newInventoryItem = new Inventory({
            product,
            quantity,
            location
        })
        await newInventoryItem.save()
        res.status(201).json(newInventoryItem)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const updateInventoryItem = async(req,res) =>{
    const { id } = req.params
    const { product, quantity, location } = req.body
    if (Array.isArray(product)) {
        try {
            for (let productId of product) {
                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    return res.status(400).json({ msg: `Invalid supplier ID: ${productId}` })
                }
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
    try{
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(
            id,
            {product, quantity, location},
            {new: true}
        )
        if(!updatedInventoryItem){
            return res.status(404).json({msg: "Inventory Item not found"})
        }
        res.json(updatedInventoryItem)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const deleteInventoryItem = async(req,res) =>{
    const { id } = req.params
    try{
        const deletedInventoryItem = await Inventory.findByIdAndDelete(id)
        if (!deletedInventoryItem){
            return res.status(404).json({ msg: "Inventory item not found" })
        }
        res.json({ msg: "Inventory Item successfully deleted"})
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    getAllInventoryItems,
    getInventoryItemById,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}