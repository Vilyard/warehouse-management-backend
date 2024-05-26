const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const{
    getAllInventoryItems,
    getInventoryItemById,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} = require ('../controllers/inventoryController')

router.get('/inventory', getAllInventoryItems)
router.get('/inventory/:id', getInventoryItemById)
router.post('/inventory',[
    check('product', 'Product ID is required and must be a valid ObjectId').isMongoId(),
    check('quantity', 'Quantity is required and must be a number').isInt({ min: 0 }),
    check('location', 'Location is required').not().isEmpty(),
], createInventoryItem)
router.put('/inventory/:id',[
    check('product', 'Product ID must be a valid ObjectId').optional().isMongoId(),
    check('quantity', 'Quantity must be a number').optional().isInt({ min: 0 }),
    check('location', 'Location cannot be empty').optional().not().isEmpty(),
], updateInventoryItem)
router.delete('/inventory/:id', deleteInventoryItem)

module.exports = router