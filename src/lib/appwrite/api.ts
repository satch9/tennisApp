import { ID, Query } from 'appwrite';
import { INewPlayer } from "@/types";
import { account, appwriteConfig, databases } from './config';


export async function createPlayerAccount(player: INewPlayer) {
    try {

        const nameCreated: string = player.firstname.concat(' ', player.lastname);

        const newAccountId = ID.unique();

        const newAccount = await account.create(
            newAccountId,
            player.email,
            player.password,
            nameCreated
        )

        console.log("newAccount API", newAccount);

        if (!newAccount) throw Error;

        //const avatarUrl = avatars.getInitials(nameCreated);

        const newPlayer = await savePlayerToDB({
            accountId: newAccount.$id,
            firstname: player.firstname,
            lastname: player.lastname,
            gender: player.gender,
            dateOfBirth: player.dateOfBirth,
            email: player.email,
            username: player.username
        });

        console.log("newPlayer API", newPlayer)


        return newPlayer;

    } catch (error) {
        console.error("Une erreur s'est produite :  ", error)
        return error as Error;
    }
}
export async function savePlayerToDB(player: {
    accountId: string;
    firstname: string;
    lastname: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    username: string;
}) {
    try {

        const documentId = ID.unique();

        console.log("appwriteConfig.databaseId API", appwriteConfig.databaseId);
        console.log("appwriteConfig.playersCollectionId API", appwriteConfig.playersCollectionId);
        console.log("documentId API", documentId);

        const newPlayer = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.playersCollectionId,
            documentId,
            player,
        )

        console.log("newPlayer API", newPlayer);

        return newPlayer;
    } catch (error) {
        console.error(error)
    }
}

export async function signInAccount(player: { email: string; password: string; }) {
    try {
        const session = await account.createEmailSession(player.email, player.password)

        return session;
    } catch (error) {
        console.error(error)
    }
}

export async function getCurrentPlayer() {
    try {

        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentPlayer = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.playersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentPlayer) throw Error;

        return currentPlayer.documents[0];

    } catch (error) {
        console.error(error)
    }
}