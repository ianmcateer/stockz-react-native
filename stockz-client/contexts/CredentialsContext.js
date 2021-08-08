import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";

// Credential context
export const CredentialsContext = createContext();

export const CREDENTIALS_STORAGE_KEY = "STOCKZ_CREDENTIALS";

export const CredentialsProvider = ({ children }) => {
    const [state, setState] = useState();

    return (
        <CredentialsContext.Provider value={[state, setState]}>
            {children}
        </CredentialsContext.Provider>
    );
};

export const useCredentialsContext = () => {
    const [state, setState] = useContext(CredentialsContext);

    const setStoredCredentials = async (credentials) => {
        setState(credentials);
        await AsyncStorage.setItem(
            CREDENTIALS_STORAGE_KEY,
            JSON.stringify(credentials)
        );
    };

    // Retrieve credentials from persistent storage
    const clearStoredCredentials = async () => {
        setState(null);
        await AsyncStorage.removeItem(CREDENTIALS_STORAGE_KEY);
    };

    // Retrieve credentials from persistent storage
    useEffect(() => {
        const fetchCredentialsFromLocalStorage = async () => {
            const result = await AsyncStorage.getItem(CREDENTIALS_STORAGE_KEY);
            setState(result);
        };

        fetchCredentialsFromLocalStorage();
    }, []);

    return {
        storedCredentials: state,
        setStoredCredentials,
        clearStoredCredentials,
    };
};
