const Inventory = require('../models/inventoryModel')

const getAllInventoryItems = async (req,res) => {
    try{
        const InventoryItems = await Inventory.find().populate('productId')
        res.json(InventoryItems)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const getInventoryItemById = async (req,res) => {
    const { id } = req.params
    try{
        const InventoryItem = await Inventory.findById(id).populate('productId')
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
    const {productId, quantity, location} = req .body
    try{
        const newInventoryItem = new Inventory({
            productId,
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