const express = require('express')
const router = express.Router()
const{
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById,
} = require ('../controllers/supplierController')

router.post('/supplier', createSupplier)
router.put('/supplier/:id', updateSupplier)
router.delete('/supplier/:id', deleteSupplier)
router.get('/supplier', getAllSuppliers)
router.get('/supplier/:id', getSupplierById)


module.exports = router