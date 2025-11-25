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

    static async getPosts(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json({message: 'Posts retornados com sucesso!', posts: posts});
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os posts.', error: error.message });
        }
    }
}

export default PostController;