const Shipment = require('../models/shipmentModel')


const getAllShipments = async(req, res) => {
    try{
        const shipments = await Shipment.find().populate('shipmentNumber')
        res.json(shipments)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const getShipmentById = async(req,res) => {
    const { id } = req.params
    try{
        const shipment = await Shipment.findById(id).populate('shipmentNumber')
        if(!shipment){
            return res.status(404).json({ msg: "Shipment not found" })
        }
        res.json(shipment)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const createShipment = async(req,res) => {
    const { shipmentNumber, orderId, carrier, trackingNumber , status, shippedAt, deliveredAt   } = req.body
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Invalid status" })
    }
    try{
        const newShipment = new Shipment({
            shipmentNumber,
            orderId,
            carrier,
            trackingNumber,
            status,
            shippedAt,
            deliveredAt
        })
        await newShipment.save()
        res.status(201).json(newShipment)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const updateShipment = async(req,res) => {
    const { id } = req.params
    const {  shipmentNumber, orderId, carrier, trackingNumber , status, shippedAt, deliveredAt } = req.body
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Invalid status" })
    }
    try{
        const updatedShipment = await Shipment.findByIdAndUpdate(
            id,
            { shipmentNumber, orderId, carrier, trackingNumber , status, shippedAt, deliveredAt },
            {new: true}
        ) 
        
        if (!updatedShipment) {
            return res.status(404).json({ msg: "Shipment not found" })
        }
        res.json(updatedShipment)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const deleteShipment = async(req,res) => {
    const { id } = req.params
    try{
        const deletedShipment = await Shipment.findByIdAndDelete(id)
        if(!deletedShipment) {
            return res.status(404).json({ msg: "Shipment not found" })
        }
        res.json({ msg:"Shipment successfully deleted" })
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    getAllShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment
}