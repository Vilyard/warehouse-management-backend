const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled']

const{
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} = require ('../controllers/orderController')

router.get('/orders', getAllOrders)
router.get('/orders/:id', getOrderById)
router.post('/orders',[
    check('orderNumber', 'Order number is required').not().isEmpty(),
    check('customerName', 'Customer name is required').not().isEmpty(),
    check('customerEmail', 'Customer email is required').isEmail(),
    check('products', 'Products must be an array').not().isEmpty(),
    check('totalAmount', 'Total amount is required and must be a number').not().isEmpty().isNumeric(),
    check('status').custom((value) =>{
        if (!validStatuses.includes(value)) {
            throw new Error('Invalid status')
        } 
        return true
    }),
], createOrder)
router.put('/orders/:id',[
    check('orderNumber', 'Order number is required').optional().not().isEmpty(),
    check('customerName', 'Customer name is required').optional().not().isEmpty(),
    check('customerEmail', 'Customer email is required').optional().isEmail(),
    check('products', 'Products must be an array').optional().not().isEmpty(),
    check('totalAmount', 'Total amount is required and must be a number').optional().not().isEmpty().isNumeric(),
    check('status').optional().custom((value) =>{
        if (!validStatuses.includes(value)) {
            throw new Error('Invalid status')
        } 
        return true
    }),
], updateOrder)
router.delete('/orders/:id', deleteOrder)

module.exports = router