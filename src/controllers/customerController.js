const Customer = require('../models/customerModel')
const { validationResult } = require('express-validator')

const createCustomer = async(req,res) => {
    const { name, email, address, phone } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const customer = new Customer({name, email ,address, phone})
        await customer.save()
        res.status(201).json(customer)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const getAllCustomers = async(req,res) => {
    try{
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const getCustomerById = async(req,res) => {
    const { id } = req.params
    try{
        const customer = await Customer.findById(id)
        if(!customer){
            return res.status(404).json({ msg: "Customer not found" })
        }
        res.status(200).json(customer)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const updateCustomer = async(req,res) => {
    const { id } = req.params
    const { name, email, address, phone } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const customer = await Customer.findByIdAndUpdate(
            id, 
            { name, email, address, phone },
            { new:true },
        )
        if(!customer) {
            return res.status(404).json({ msg: "Customer not found" })
        }
        res.status(200).json(customer)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const deleteCustomer = async(req,res) => {
    const { id } = req.params    
    try{
        const customer = await Customer.findByIdAndDelete(id)
        if(!customer) {
            return res.status(404).json({ msg: "Customer not found" })
        }
        res.status(200).json({ msg: "Customer deleted successfully" })
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}