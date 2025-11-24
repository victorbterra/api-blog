import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [String],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // adiciona campos createdAt e updatedAt automaticamente
);

const Post = mongoose.model("Post", PostSchema); // cria o modelo Post com o esquema definido

export default Post; // exporta o modelo Post para ser usado em outras partes da aplicação