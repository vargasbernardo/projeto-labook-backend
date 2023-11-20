import z from 'zod'
import { Post } from '../../models/Post'

export interface FetchPostsInputDTO {
    idToBeSearched?: string
}

export interface FetchPostsOutputDTO {
    posts: Array<Post>
}

export const FetchPostsSchema = z.object({
    idToBeSearched: z.string().min(1).optional()
}).transform(data => data as FetchPostsInputDTO)