const express = require('express')
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
router.post('/inventory', createInventoryItem)
router.put('/inventory/:id', updateInventoryItem)
router.delete('/inventory/:id', deleteInventoryItem)

module.exports = router