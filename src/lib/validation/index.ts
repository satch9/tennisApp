import * as z from "zod";

export const SignupValidation = z.object({
    firstname: z.string().min(2, { message: "Trop court !" }),
    lastname: z.string().min(2, { message: "Trop court !" }),
    gender: z.string().default("F"),
    username: z.string().min(2, { message: "Trop court !" }),
    dateOfBirth: z.string(),
    email: z.string().email({message: "Votre email est invalide !"}),
    password: z.string().min(8, { message: "Votre mot de passe doit contenir 8 caractères minimum" })
});