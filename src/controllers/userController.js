const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require ("bcryptjs")
const { validationResult } = require("express-validator")


const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  } 
  const { name, email, password, role } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User already exists" })
    }
    user = new User({
      name,
      email,
      password,
      role,
    })

    await user.save()

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.status(201).json({ token })
    })
  } catch (err) {
    console.error(err.message)
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({ msg: "Invalid Credentials" })
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    }
    jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

const getUser = async(req, res) => {
    const { id } = req.params
    try{
        const user = await User.findById(id).select('-password')
        if(!user) {
            return res.status(404).json({msg:"User not found"})
        }
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const getAllUsers = async(req,res) => {
    try{
        const users = await User.find().select('-password')
        res.json(users)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }
  try {
      let updatedFields = {}
      if (name) updatedFields.name = name
      if (email) updatedFields.email = email
      if (role) updatedFields.role = role
      if (password) {
          const salt = await bcrypt.genSalt(10);
          updatedFields.password = await bcrypt.hash(password, salt)
      }
      const user = await User.findByIdAndUpdate(
          id,
          { $set: updatedFields },
          { new: true, runValidators: true }
      )
      if (!user) {
          return res.status(404).json({ msg: "User not found" })
      }
      res.json({ msg: "User successfully updated", user })
  } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    let user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }
    res.status(200).json({ msg: 'User deleted successfully' })
  } catch (err) {
    console.error(err.mssage)
    res.status(500).send("Server Error")
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
}
