import { getCurrentPlayer } from '@/lib/appwrite/api';
import { IContextType, IPlayer } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_PLAYER = {
    id: '',
    firstname: '',
    lastname: '',
    gender: '',
    username: '',
    dateOfBirth: '',
    email: '',
    password: '',
}

const INITIAL_STATE = {
    player: INITIAL_PLAYER,
    isLoading: false,
    isAuthenticated: false,
    setPlayer: () => { },
    setIsAuthenticated: () => { },
    checkAuthPlayer: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [player, setPlayer] = useState<IPlayer>(INITIAL_PLAYER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate()

    const checkAuthPlayer = async () => {
        try {
            const currentAccount = await getCurrentPlayer();

            if (currentAccount) {
                setPlayer({
                    id: currentAccount.$id,
                    firstname: currentAccount.firstname,
                    lastname: currentAccount.lastname,
                    gender: currentAccount.gender,
                    username: currentAccount.username,
                    dateOfBirth: currentAccount.dateOfBirth,
                    email: currentAccount.email,
                    password: ''
                })
                setIsAuthenticated(true);

                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        //localStorage.getItem('cookieFallBack') === null
        if (
            localStorage.getItem('cookieFallBack') === '[]'
        ) navigate('/sign-in');

        checkAuthPlayer();

    }, [])

    const value = {
        player,
        setPlayer,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthPlayer
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const usePlayerContext = () => useContext(AuthContext)