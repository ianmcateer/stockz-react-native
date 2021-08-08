import React, { useState, useContext, useEffect } from "react";
import { addSymbolToWatchList, getWatchList } from "../services/api";

const StocksContext = React.createContext([]);

export const StocksProvider = ({ children }) => {
    const [state, setState] = useState([]);

    return (
        <StocksContext.Provider value={[state, setState]}>
            {children}
        </StocksContext.Provider>
    );
};

export const useStocksContext = () => {
    const [state, setState] = useContext(StocksContext);

    // Retrieve watchlist from persistent storage (db)
    const fetchWatchList = async () => {
        const { data: watchList } = await getWatchList();
        setState(watchList);
    };

    // save the new symbol to the watchlist in the db, and save it in useStockContext state
    const addToWatchlist = async (symbol) => {
        try {
            await addSymbolToWatchList(symbol);
            fetchWatchList();
        } catch (err) {
            throw new Error(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchWatchList();
    }, []);

    return {
        ServerURL: "http://131.181.190.87:3001",
        watchList: state,
        addToWatchlist,
    };
};
