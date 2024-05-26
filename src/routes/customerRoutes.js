const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const{
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require ('../controllers/customerController')

router.get('/customer', getAllCustomers)
router.get('/customer/:id', getCustomerById)
router.post('/customer',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty()
], createCustomer)
router.put('/customer/:id',[
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Email is required').optional().not().isEmpty().isEmail(),
    check('phone', 'Phone number is required').optional().not().isEmpty(),
    check('address', 'Address is required').optional().not().isEmpty()
], updateCustomer)
router.delete('/customer/:id', deleteCustomer)

module.exports = router