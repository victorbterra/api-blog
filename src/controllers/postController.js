import Post from "../models/postModel";



// cria um novo post

async function createPost(req, res) {
  try {
    const { title, content, author, slug, tags } = req.body;
    const post = new Post({ title, content, author, slug, tags });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}