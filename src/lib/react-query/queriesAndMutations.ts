import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query"
import { createPlayerAccount, signInAccount } from "../appwrite/api"
import { INewPlayer } from "@/types"

export const useCreatePlayerAccount = () => {
    return useMutation({
        mutationFn: (player: INewPlayer) => createPlayerAccount(player),
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (player: {
            email: string;
            password: string
        }) => signInAccount(player),
    })
}