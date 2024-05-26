const express = require('express')
const router = express.Router()
const{
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require ('../controllers/customerController')

router.get('/customer', getAllCustomers)
router.get('/customer/:id', getCustomerById)
router.post('/customer', createCustomer)
router.put('/customer/:id', updateCustomer)
router.delete('/customer/:id', deleteCustomer)

module.exports = router