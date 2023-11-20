import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { BaseError } from "../errors/BaseError";
import { FetchPostsInputDTO, FetchPostsSchema } from "../dtos/Posts/fetchPosts.dto";
import { ZodError } from "zod";
import { CreateNewPostSchema } from "../dtos/Posts/createNewPost.dto";
import { EditPostSchema } from "../dtos/Posts/editPost.dto";
import { DeletePostSchema } from "../dtos/Posts/deletePost.dto";

export class PostsController {
  constructor(
    private postsBusiness: PostsBusiness
  ){}
  public fetchPosts = async (req: Request, res: Response) => {
    try {
      const input: FetchPostsInputDTO = FetchPostsSchema.parse({
        idToBeSearched: req.query.id
      });
      const output = await this.postsBusiness.fetchPosts(input);

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createNewPost = async (req: Request, res: Response) => {
    try {
      const input = CreateNewPostSchema.parse({
        id: req.body.id,
        creatorId: req.body.creatorId,
        content: req.body.content,
      });
      
      const output = await this.postsBusiness.createNewPost(input);

      res.status(201).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        idToEdit: req.params.id,
        content: req.body.content,
      });
      
      const output = await this.postsBusiness.editPost(input);

      res.status(201).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.params.id,
      });
      
      const output = this.postsBusiness.deletePost(input);

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
