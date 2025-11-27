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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // Verificar se o usuário existe
        if (!user) return res.status(400).json({ message: "Credenciais inválidas" });
        // Comparar a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Senha inválida" });
        // Gerar token JWT (implementar conforme necessário)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};