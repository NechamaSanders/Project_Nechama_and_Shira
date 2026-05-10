import User from '../DAL/models/userModel.js';
import baseModel from '../DAL/models/baseModel.js';
import Comment from '../DAL/models/commentModel.js';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userRes = await User.getByUsername(username);
        const user = userRes[0];
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const dbPassword = await User.getUserPassword(user.id);

        if (password === dbPassword.password) {
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid username or password" });
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
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, ...rest } = req.body;

        if (username) {
            const existing = await User.getByUsername(username);
            if (existing[0] && String(existing[0].id) !== String(id))
                return res.status(409).json({ message: "Username already taken" });
        }
        if (email) {
            const existing = await baseModel.getByColumn('users', 'email', email);
            if (existing[0] && String(existing[0].id) !== String(id))
                return res.status(409).json({ message: "Email already taken" });
        }

        const currentUser = await User.getById(id);
        const updated = await User.update(id, { username, email, ...rest });

        if (username && currentUser)
            await baseModel.updateByColumn('comments', 'email', currentUser.email, { name: username });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        const dbPassword = await User.getUserPassword(id);
        if (currentPassword !== dbPassword.password)
            return res.status(401).json({ message: "Current password is incorrect" });

        await baseModel.updateByColumn('passwords', 'userId', id, { password: newPassword });
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export default { login, register, updateProfile, changePassword };