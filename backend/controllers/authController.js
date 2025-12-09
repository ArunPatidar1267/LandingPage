const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = password === user.password;
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:  24 * 60 * 60 * 1000,
    });

        res.json({ 
            message: "Login successful", 
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const isLoggedIn = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
        }
        res.json({ message: "User is logged in", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { login, isLoggedIn, logout };