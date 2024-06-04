
import UserModel from "../models/users.js";

const userController={
    getUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json({ users });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    getUserById: async (req, res) => {
        const userId = req.params.id
        try {
            const user = await UserModel.findById(userId).populate('links');;
            res.json({ user })
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    },

    addUser: async (req, res) => {

        const { name, email, password } = req.body;
        try {
            const newUser = await UserModel.create({ name, email, password });
            res.json(newUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    
    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await UserModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
}
export default userController;