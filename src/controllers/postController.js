import mongoose from "mongoose";
import Post from "../models/postModel.js";
import Category from "../models/categoryModel.js";

class PostController {
  static async createPost(req, res) {
    try {
      let { title, content, author, slug, tags, category } = req.body;

      // 1. TRATAMENTO DE TAGS (String -> Array)
      if (tags && typeof tags === "string") {
        tags = tags.split(",").map((tag) => tag.trim());
      } else if (!tags) {
        tags = [];
      }

      // 2. TRATAMENTO DE CATEGORIA (Nome -> ID)
      if (category) {
        // Verifica se O QUE VEIO NÃO É um ID válido (ou seja, é um nome como "tecnologia")
        if (!mongoose.Types.ObjectId.isValid(category)) {
          // Tenta achar a categoria pelo nome
          let categoryFound = await Category.findOne({ name: category });

          // Se não achar, cria a categoria nova na hora
          if (!categoryFound) {
            categoryFound = await Category.create({
              name: category,
              slug: category.toLowerCase().replace(/ /g, "-"), // cria um slug simples
            });
          }

          // Substitui o texto pelo ID real que o banco aceita
          category = categoryFound._id;
        }
      } else {
        // 3. SE NÃO VEIO CATEGORIA NENHUMA -> USA "GERAL"
        let defaultCategory = await Category.findOne({
          $or: [{ slug: "geral" }, { name: "Geral" }],
        });

        if (!defaultCategory) {
          defaultCategory = await Category.create({
            name: "Geral",
            slug: "geral",
          });
        }
        category = defaultCategory._id;
      }

      // Agora 'category' é garantidamente um ID válido
      const newPost = new Post({
        title,
        content,
        author,
        slug,
        tags,
        category,
      });

      await newPost.save();
      res
        .status(201)
        .json({ message: "Post criado com sucesso", post: newPost });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar o post.", error: error.message });
    }
  }

  static async getPosts(req, res) {
    try {
      const { title } = req.query;
      let filter = {};
      if (title) {
        filter.title = { $regex: title, $options: "i" }; // busca por título com regex para permitir buscas parciais e case insensitive
      }
      let { page = 1, limit = 10 } = req.query; // paginação
      page = parseInt(page);
      limit = parseInt(limit);
      const posts = await Post.find(filter)
        .populate("category")
        .skip((page - 1) * limit) // Calcula o número de documentos a serem pulados com base na página atual e no limite
        .limit(limit);
      // popula os dados da categoria

      res
        .status(200)
        .json({ message: "Posts retornados com sucesso!", posts: posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar os posts.", error: error.message });
    }
  }

  static async getPostById(req, res) {
    try {
      const postId = req.params.id;
      const findPostId = await Post.findById(postId);
      if (findPostId) {
        res
          .status(200)
          .json({ message: "Post encontrado com sucesso!", post: findPostId });
      } else {
        res.status(404).json({ message: "Post não encontrado." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar o post.", error: error.message });
    }
  }
  static async getPostBySlug(req, res) {
    try {
      const postSlug = req.params.slug;
      const findPostSlug = await Post.findOne({ slug: postSlug }).populate(
        "category"
      );
      if (findPostSlug) {
        res.status(200).json({
          message: "Post encontrado com sucesso!",
          post: findPostSlug,
        });
      } else {
        res.status(404).json({ message: "Post não encontrado." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar o post.", error: error.message });
    }
  }

static async updatePost(req, res) {
  try {
    const postId = req.params.id;
    
    // Desestrutura para podermos tratar os dados antes de salvar
    let { title, content, slug, tags, category } = req.body;

    // 1. TRATAMENTO DE TAGS (Se vier string, vira array)
    if (tags && typeof tags === 'string') {
      tags = tags.split(',').map(tag => tag.trim());
    }

    // 2. TRATAMENTO DE CATEGORIA (Nome -> ID)
    if (category) {
      // Se NÃO for um ID válido (ou seja, é um nome como "Tecnologia")
      if (!mongoose.Types.ObjectId.isValid(category)) {
        
        // Procura a categoria pelo nome
        let categoryFound = await Category.findOne({ name: category });
        
        // Se não existir, cria
        if (!categoryFound) {
          categoryFound = await Category.create({
            name: category,
            slug: category.toLowerCase().replace(/ /g, '-')
          });
        }
        
        // Substitui o nome pelo ID
        category = categoryFound._id;
      }
    }

    // 3. ATUALIZA NO BANCO COM OS DADOS TRATADOS
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, slug, tags, category }, // Objeto explícito
      { new: true } // Retorna o post atualizado
    );

    if (updatedPost) {
      res.status(200).json({ message: "Post atualizado com sucesso!", post: updatedPost });
    } else {
      res.status(404).json({ message: "Post não encontrado." });
    }

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o post.", error: error.message });
  }
}

  static async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (deletedPost) {
        res
          .status(200)
          .json({ message: "Post deletado com sucesso!", post: deletedPost });
      } else {
        res.status(404).json({ message: "Post não encontrado." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar o post.", error: error.message });
    }
  }
}

export default PostController;
