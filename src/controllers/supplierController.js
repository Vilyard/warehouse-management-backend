const Supplier = require('../models/supplierModel')
const { validationResult } = require('express-validator')

const getAllSuppliers = async (req,res) => {
    try{
        const suppliers = await Supplier.find().populate('suppliedProducts')
        res.json(suppliers)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const createSupplier = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, contactName, contactEmail, contactPhone, address, suppliedProducts } = req.body
    try{
        const supplier = new Supplier({name, contactName, contactEmail, contactPhone, address, suppliedProducts})
        await supplier.save()
        res.status(201).json(supplier)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const updateSupplier = async(req,res) => {
    const { id } = req.params
    const { name, contactName, contactEmail, contactPhone, address, suppliedProducts } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const supplier = await Supplier.findByIdAndUpdate(
            id,
            { name, contactName, contactEmail, contactPhone, address, suppliedProducts },
            { new: true }
        )
        if(!supplier){
            console.log(supplier)
            return res.status(404).json({ msg: "Supplier not found" })
        }
        res.status(200).json(supplier)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const deleteSupplier = async(req,res) => {
    const { id } = req.params
    try{
        const supplier  = await Supplier.findByIdAndDelete(id)
        if(!supplier){
            return res.status(404).json({ msg: "Supplier not found" })
        }
        res.status(200).json({ msg: 'Supplier deleted successfully' })
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const getSupplierById = async (req,res) => {
    const { id } = req.params
    try{
        const supplier = await Supplier.findById(id).populate('suppliedProducts')
        if(!supplier){
            return res.status(404).json({msg: "Supplier not found"})
        }
        res.json(supplier)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById
}