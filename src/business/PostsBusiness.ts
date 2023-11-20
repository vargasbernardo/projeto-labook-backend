import { PostDatabase } from "../database/PostDatabase";
import { CreateNewPostInputDTO, CreateNewPostOutputDTO } from "../dtos/Posts/createNewPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/Posts/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/Posts/editPost.dto";
import { FetchPostsInputDTO, FetchPostsOutputDTO } from "../dtos/Posts/fetchPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post, PostDB } from "../models/Post";


export class PostsBusiness {
  constructor(
    private postDatabase: PostDatabase
  ){}
  public async fetchPosts(input: FetchPostsInputDTO): Promise<FetchPostsOutputDTO> {
    const {idToBeSearched} = input
    const postDB = await this.postDatabase.getPosts();
    const posts: Array<Post> = postDB.map(
      (post) =>
        new Post(
          post.id,
          post.creator_id,
          post.content,
          post.likes,
          post.dislikes,
          post.created_at,
          post.updated_at
        )
    );
    const output: FetchPostsOutputDTO = {
      posts
    }
    return output;
  }
  public async createNewPost(input: CreateNewPostInputDTO): Promise<CreateNewPostOutputDTO> {
    const { id, creatorId, content } = input;
    
    const idToBeCreated = await this.postDatabase.getPostById(id);
    if (idToBeCreated) {
      throw new BadRequestError("esse id ja esta cadastrado");
    }
    const newPost = new Post(
      id,
      creatorId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );
    const newPostDB: PostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    await this.postDatabase.insertPost(newPostDB);

    const output: CreateNewPostOutputDTO = {
      message: "Post criado!",
      post: {
        id: newPost.getId(),
        creatorId: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        createdAt: newPost.getCreatedAt(),
        updatedAt: newPost.getUpdatedAt()
      }
    }
    return output;
  }
  public async editPost(input: EditPostInputDTO): Promise<EditPostOutputDTO> {
    const { idToEdit, content } = input;

    
    const postDB = await this.postDatabase.getPostById(idToEdit);
    if (!postDB) {
      throw new NotFoundError("'id' nao encontrado");
    }
    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );
    
    content && post.setContent(content);

    const newPostDb: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };
    await this.postDatabase.updatePost(newPostDb, idToEdit);

    const output: EditPostOutputDTO = {
      message: "post atualizado",
      post: {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt()
      }
    }
    return output
  }
  public async deletePost(input: DeletePostInputDTO):Promise<DeletePostOutputDTO> {
    const { idToDelete } = input;
    
    const postDB = await this.postDatabase.getPostById(idToDelete);
    if (!postDB) {
      throw new NotFoundError("id nao encontrado");
    }
    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );
    const deletedPost: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await this.postDatabase.deletePost(deletedPost, idToDelete);

    const output: DeletePostOutputDTO = {
      message: "Post deletado",
      post
    }
    return output;
  }
}
