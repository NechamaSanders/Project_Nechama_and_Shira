const User = require('../DAL/models/userModel');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userRes = await User.getByUsername(username);
        const user = userRes[0];
        if (!user) return res.status(401).json({ message: "User not found" });

        const dbPassword = await User.getUserPassword(user.id);

        if (password === dbPassword.password) {
            res.json(user);
        } else {
            res.status(401).json({ message: "Wrong password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login };