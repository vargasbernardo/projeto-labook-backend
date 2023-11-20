import z from 'zod'
import { Post } from '../../models/Post'

export interface DeletePostInputDTO {
    idToDelete: string
}

export interface DeletePostOutputDTO {
    message: string,
    post: Post
}

export const DeletePostSchema = z.object({
    idToDelete: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)