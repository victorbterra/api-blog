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

    static async getPostById(req, res) {
        try{
            const postId = req.params.id;
            const findPostId = await Post.findById(postId);
            if(findPostId){
                res.status(200).json({message: 'Post encontrado com sucesso!', post: findPostId});
            } else {
                res.status(404).json({message: 'Post não encontrado.'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar o post.', error: error.message });
        }
    }
    static async getPostBySlug(req, res) {
        try{
            const postSlug = req.params.slug;
            const findPostSlug = await Post.findOne({slug: postSlug});
            if(findPostSlug) {
                res.status(200).json({messagem: 'Post encontrado com sucesso!', post: findPostSlug});
            } else {
                res.status(404).json({message: 'Post não encontrado.'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar o post.', error: error.message });
        }
    }

    static async updatePost(req, res) {
        try{
            const postId = req.params.id;
            const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
            if(updatedPost) {
                res.status(200).json({messagem: 'Post atualizado com sucesso!', post: updatedPost});
            } else {
                res.status(404).json({messagem: 'Post não encontrado.'});
            }
        } catch (error) {
            res.status(500).json({ messagem: 'Erro ao atualizar o post.', error: error.message });
        }
    }
}

export default PostController;