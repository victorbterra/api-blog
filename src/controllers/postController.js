import Post from "../models/postModel.js";


class PostController {
    static async createPost(req, res) {
        try {
            const newPost = new Post(req.body);
            await newPost.save();
            res.status(201).json({mensagem: 'Post criado com sucesso!', Post: newPost});
        } catch (error) {
            res.status(500).json({ message:'Erro ao criar o post. ', error: error.message });
        }
    }
}

export default PostController;