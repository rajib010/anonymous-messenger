import { z } from 'zod';

export const usernameValidation = z.string()
    .min(3, 'username must be atleast 3 characters')
    .max(12, 'username must be nomore than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:'Password must be atleast 6 characters'}),
})