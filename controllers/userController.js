const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtToken= "RANDOM-TOKEN";
const userController = {
  signup: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Email is already registered",
        });
      } else {
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  },
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    jwt.verify(refreshToken, jwtToken, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
      user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
      user.save();

      const newAccessToken = jwt.sign({ userId: user._id }, jwtToken, {
        expiresIn: '15m',
      });
      res.json({ accessToken: newAccessToken });
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        jwtToken,
        { expiresIn: "24h" }
      );
     


      const refreshToken = jwt.sign({ userId: user._id }, jwtToken);
      user.refreshTokens.push(refreshToken);
      await user.save();

      const data = {
        token: token,
        refreshToken: refreshToken,
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      res.status(200).json({ message: "Login successful", data });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Validation Error", message: error.message });
      } else {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching user details" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.role = req.body.role;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: "An error occurred while updating user details" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error getting users" });
    }
  },
};
module.exports = userController;
