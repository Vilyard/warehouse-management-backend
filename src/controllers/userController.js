const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role,
    })

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token })
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error")
  }
}

const getUser = async(req, res) => {
    const { id } = req.params
    try{
        const user = await User.findById(id)
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
        const users = await User.find()
        res.json(users)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    let user = await User.findByIdAndUpdate(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.json({ msg: "User successfully updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.remove();
    res.json({ msg: "User successfully deleted" });
  } catch (err) {
    console.error(err.mssage);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
