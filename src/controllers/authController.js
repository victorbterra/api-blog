import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};