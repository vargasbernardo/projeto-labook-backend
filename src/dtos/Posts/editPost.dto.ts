import z from 'zod'

export interface EditPostInputDTO {
    idToEdit: string,
    content: string
}

export interface EditPostOutputDTO {
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

export const EditPostSchema = z.object({
    idToEdit: z.string().min(1),
    content: z.string()
})