const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { createShipment, updateShipment, deleteShipment, getAllShipments, getShipmentById } = require('../controllers/shipmentController')

const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled']

router.post('/shipment', [
    check('shipmentNumber', 'Shipment number is required').not().isEmpty(),
    check('orderId', 'Order ID is required').not().isEmpty(),
    check('carrier', 'Carrier is required').not().isEmpty(),
    check('trackingNumber', 'Tracking number is required').not().isEmpty(),
    check('status').custom((value) => {
        if (!validStatuses.includes(value)) {
            throw new Error('Invalid status')
        }
        return true
    }),
    check('shippedAt', 'Shipped date is required').not().isEmpty(),
    check('deliveredAt', 'Delivered date is required').not().isEmpty()
], createShipment)

router.put('/shipment/:id', [
    check('shipmentNumber', 'Shipment number is required').optional().not().isEmpty(),
    check('orderId', 'Order ID is required').optional().not().isEmpty(),
    check('carrier', 'Carrier is required').optional().not().isEmpty(),
    check('trackingNumber', 'Tracking number is required').optional().not().isEmpty(),
    check('status').optional().custom((value) => {
        if (!validStatuses.includes(value)) {
            throw new Error('Invalid status')
        }
        return true
    }),
    check('shippedAt', 'Shipped date is required').optional().not().isEmpty(),
    check('deliveredAt', 'Delivered date is required').optional().not().isEmpty()
], updateShipment)

router.delete('/shipment/:id', deleteShipment)
router.get('/shipment', getAllShipments)
router.get('/shipment/:id', getShipmentById)

module.exports = router