import z from 'zod'

export interface CreateNewPostInputDTO {
    id: string,
    creatorId: string,
    content: string
}

export interface CreateNewPostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes:number,
        createdAt: string,
        updatedAt: string
    }
}

export const CreateNewPostSchema = z.object({
    id: z.string().min(1),
    creatorId: z.string().min(1),
    content: z.string().max(240)
}).transform(data => data as CreateNewPostInputDTO)