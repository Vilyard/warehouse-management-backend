const express = require('express')
const router = express.Router()
const {
    getAllShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment
} = require('../controllers/shipmentController')

router.get('/shipment',getAllShipments)
router.get('/shipment/:id',getShipmentById)
router.post('/shipment',createShipment)
router.put('/shipment/:id',updateShipment)
router.delete('/shipment/:id',deleteShipment)

module.exports = router