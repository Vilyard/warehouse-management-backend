const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser, deleteUser, getAllUsers, getUser } = require ('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/user/:id', getUser)
router.get('/users', getAllUsers)

module.exports = router