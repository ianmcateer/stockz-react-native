import AsyncStorage from "@react-native-async-storage/async-storage";
import { times } from "lodash";
import { CREDENTIALS_STORAGE_KEY } from "../contexts/CredentialsContext";

const axios = require("axios");

const getToken = async () => {
    const credentialsStorageJSON = await AsyncStorage.getItem(
        CREDENTIALS_STORAGE_KEY
    );
    const credentialsStorage = JSON.parse(credentialsStorageJSON);
    return credentialsStorage && credentialsStorage.token;
};

const xhr = axios.create({
    baseURL: "https://stockz-api-1.herokuapp.com",
    timeout: 30000,
});

xhr.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async ({ email, password }) =>
    await xhr.post("/login", { email, password });

export const logout = async () => {
    try {
        const result = await xhr.post("/logout");
        return result;
    } catch (err) {
        console.log(err, "error");
        throw new Error("Logout failed");
    }
};

export const signup = async ({ email, password }) => {
    try {
        const response = await xhr.post("/register", {
            email,
            password,
        });
        return response;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Error signing up");
    }
};

export const getSymbolsList = async () => {
    return await xhr.get("/stocks");
};

export const addSymbolToWatchList = async (symbol) =>
    xhr.put("/watchlist", {
        symbol,
    });

export const getWatchList = async () => xhr.get("/watchlist");

export const fetchHistorialPrice = async (symbol, timeSeries = 1) =>
    xhr.get(`/historical-price-full/${symbol}/${timeSeries}`);
