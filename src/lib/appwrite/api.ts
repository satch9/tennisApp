import { ID } from 'appwrite';
import { INewPlayer } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

export async function createPlayerAccount(player: INewPlayer) {
    try {

        let nameCreated: string= player.firstname.concat(' ', player.lastname);

        const newAccount = await account.create(
            ID.unique(),
            player.email,
            player.password,
            nameCreated
        )

        if(!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(nameCreated);

        const newPlayer = await savePlayerToDB({
            accountId: newAccount.$id,
            firstname: player.firstname,
            lastname: player.lastname,
            gender: player.gender,
            dateOfBirth: player.dateOfBirth,
         })
        

        return newPlayer;

    } catch (error) {
        console.log("error api ",error)
        return error;
    }
}

export async function savePlayerToDB(player: {
    accountId: string;
    firstname: string;
    lastname: string;
    gender: string;
    dateOfBirth:string;
}) {
    try {
        const newPlayer = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.playersCollectionId,
            ID.unique(),
            player,
        )
        
        return newPlayer;
    } catch (error) {
        console.log(error)
    }
}