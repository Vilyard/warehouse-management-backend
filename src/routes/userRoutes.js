const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { registerUser, loginUser, updateUser, deleteUser, getAllUsers, getUser } = require ('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/register',[
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'email', 'Please include a valid email' ).isEmail(),
    check( 'password', 'Please enter a password with 6 or more characters' ).isLength({ min: 6}),
    check( 'role', 'Role must be either user or admin' ).optional().isIn(['user', 'admin'])
], registerUser)
router.post('/login',[
    check( 'email', 'Please include a valid email' ).isEmail(),
    check( 'password', 'Password is required' ).exists()
], loginUser)
router.put('/user/:id', auth, updateUser)
router.delete('/user/:id', deleteUser)
router.get('/user/:id', auth, getUser)
router.get('/users', auth, getAllUsers)

module.exports = router