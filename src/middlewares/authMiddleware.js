import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Acesso negado. Token não fornecido" });
    try {
        const verified = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido ou expirado. Verifique o token e tente novamente." });
    }
};

export default authMiddleware;