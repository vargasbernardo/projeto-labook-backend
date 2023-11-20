import express from "express";
import { PostsController } from "../controller/PostsController";
import { PostDatabase } from "../database/PostDatabase";
import { PostsBusiness } from "../business/PostsBusiness";

export const postsRouter = express.Router();

const postsController = new PostsController(
    new PostsBusiness(
        new PostDatabase()
    )
);

// CRUD posts
// GET posts
postsRouter.get("/", postsController.fetchPosts);

// Post new post
postsRouter.post("/", postsController.createNewPost);
// PUT Edit a post
postsRouter.put("/:id", postsController.editPost);
// Delete existing post
postsRouter.delete("/:id", postsController.deletePost);
