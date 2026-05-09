import User from '../DAL/models/userModel.js';

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
const register = async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const userId = await User.create(userData);

        await User.createPassword({ userId, password });

        const user = await User.getById(userId);

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default { login, register };