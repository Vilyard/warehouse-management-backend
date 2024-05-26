const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const{
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById,
} = require ('../controllers/supplierController')

router.post('/supplier',[
    check('name','Name is required').not().isEmpty(),
    check('contactName', 'Contact name is required').not().isEmpty(),
    check('contactEmail', 'Please include a valid email').isEmail(),
    check('contactPhone', 'Contact phone is required').not().isEmpty,
    check('address', 'Address is required').not().isEmpty,
    check('suppliedProducts', 'Supplied Products must be an array of product IDs').optional().isArray()
], createSupplier)
router.put('/supplier/:id',[
    check('name','Name is required').optional().not().isEmpty(),
    check('contactName', 'Contact name is required').optional().not().isEmpty(),
    check('contactEmail', 'Please include a valid email').optional().isEmail(),
    check('contactPhone', 'Contact phone is required').optional().not().isEmpty,
    check('address', 'Address is required').optional().not().isEmpty,
    check('suppliedProducts', 'Supplied Products must be an array of product IDs').optional().isArray()
], updateSupplier)
router.delete('/supplier/:id', deleteSupplier)
router.get('/supplier', getAllSuppliers)
router.get('/supplier/:id', getSupplierById)


module.exports = router