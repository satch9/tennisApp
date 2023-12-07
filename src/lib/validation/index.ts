import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Trop court !" }),
    username: z.string().min(2, { message: "Trop court !" }),
    email: z.string().email({message: "Votre email est invalide !"}),
    password: z.string().min(8, { message: "Votre mot de passe doit contenir 8 caractères minimum" })
});