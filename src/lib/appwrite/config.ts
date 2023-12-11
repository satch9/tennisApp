import { Client, Account, Databases, Storage, Avatars} from "appwrite";

export const appwriteConfig = {
    url : import.meta.env.VITE_APPWRITE_URL,
    projectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
    tieBreackerCollectionId: import.meta.env.VITE_APPWRITE_TIE_BREAKERS_ID,
    setScoreCollectionId: import.meta.env.VITE_APPWRITE_SET_SCORE_ID,
    fixturesCollectionId: import.meta.env.VITE_APPWRITE_FIXTURES_ID,
    playingInCollectionId: import.meta.env.VITE_APPWRITE_PLAYING_IN_ID,
    registrationsPlayersCollectionId: import.meta.env.VITE_APPWRITE_REGISTRATIONS_PLAYERS_ID,
    registrationsCollectionId: import.meta.env.VITE_APPWRITE_REGISTRATIONS_ID,
    tournamentPlayingCategoriesCollectionId: import.meta.env.VITE_APPWRITE_TOURNAMENT_PLAYING_CATEGORIES_ID,
    tournamentsCollectionId: import.meta.env.VITE_APPWRITE_TOURNAMENTS_ID,
    playingCategoriesCollectionId: import.meta.env.VITE_APPWRITE_PLAYING_CATEGORIES_ID,
    tournamentsTypesCollectionId: import.meta.env.VITE_APPWRITE_TOURNAMENTS_TYPES_ID,
    surfaceTypesCollectionId: import.meta.env.VITE_APPWRITE_SURFACE_TYPES_ID,
    countriesCollectionId: import.meta.env.VITE_APPWRITE_COUNTRIES_ID,
    playersCollectionId: import.meta.env.VITE_APPWRITE_PLAYERS_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);