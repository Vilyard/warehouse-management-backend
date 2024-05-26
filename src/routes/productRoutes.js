const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const{
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require ('../controllers/productController')

router.get('/product', getAllProducts)
router.get('/product/:id', getProductById)
router.post('/product',[
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty().isNumeric(),
    check('quantity', 'Quantity is required').not().isEmpty().isNumeric(),
    check('category', 'Category is required').not().isEmpty(),
    check('sku', 'SKU is required').not().isEmpty(),
    check('suppliers', 'Suppliers must be an array').not().isArray(),
], createProduct)
router.put('/product/:id',[
    check('name', 'Name is required').optional().not().isEmpty(),
    check('description', 'Description is required').optional().not().isEmpty(),
    check('price', 'Price is required').optional().not().isEmpty().isNumeric(),
    check('quantity', 'Quantity is required').optional().not().isEmpty().isNumeric(),
    check('category', 'Category is required').optional().not().isEmpty(),
    check('sku', 'SKU is required').optional().not().isEmpty(),
    check('suppliers', 'Suppliers must be an array').optional().not().isArray(),
],
 updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router