import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import ErrorMessage from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { StockList } from "../components/StockList";
import { PageTitle } from "../components/styles";
import { getSymbolsList } from "../services/api";
import { debounce } from "lodash";

export default function SearchScreen({ navigation }) {
    const { addToWatchlist } = useStocksContext();
    const [state, setState] = useState({
        searchText: "",
        stocks: [],
        filteredStocks: [],
        isLoading: false,
        error: "",
    });

    const { searchText, stocks, filteredStocks, isLoading, error } = state;

    const setIsLoading = (boolean) => {
        setState((prevState) => ({ ...prevState, isLoading: boolean }));
    };

    const setError = (err) => {
        const message = err ? JSON.stringify(err.message) : null;
        setState((prevState) => ({
            ...prevState,
            error: message,
        }));
    };

    const fetchStocks = async () => {
        setIsLoading(true);
        try {
            const { data } = await getSymbolsList();
            setState((prevState) => ({
                ...prevState,
                stocks: data,
                filteredStocks: data,
            }));
        } catch (err) {
            setError({ message: "There was an error fetching the stocks" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filteredStocks = stocks.filter(
            ({ name, symbol }) =>
                name.toUpperCase().includes(searchText.toUpperCase()) ||
                symbol.toUpperCase().includes(searchText.toUpperCase())
        );
        setState((prev) => ({ ...prev, filteredStocks }));
    }, [searchText]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleChangeSearchText = debounce((text) => {
        setState((prevState) => ({
            ...prevState,
            searchText: text,
            filteredStocks: [],
        }));
    }, 500);

    const addStockToWatchList = async (stock) => {
        setIsLoading(true);
        try {
            await addToWatchlist(stock.symbol);
            navigation.navigate("Stocks");
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <PageTitle>Search</PageTitle>
                <PromptText>Type a company name or stock symbol:</PromptText>
                <SearchBox
                    value={state.searchText}
                    onChange={handleChangeSearchText}
                />
                <Loader loading={isLoading} />
                <ErrorMessage>{error}</ErrorMessage>
                <StockList
                    stocks={filteredStocks}
                    addStockToWatchList={addStockToWatchList}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // default, get full space
    },

    promptText: {
        marginTop: scaleSize(5),
        color: "#fff",
        textAlign: "center",
    },

    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F1F1F", //grey
        height: scaleSize(40),
        borderRadius: scaleSize(10),
        marginHorizontal: scaleSize(3),
        marginTop: scaleSize(5),
    },
    searchIcon: {
        paddingHorizontal: scaleSize(15),
        color: "#fff",
        fontSize: scaleSize(20),
    },
    searchInput: {
        flex: 1,
        color: "#fff",
    },
});

function PromptText({ children }) {
    return <Text style={styles.promptText}>{children}</Text>;
}

function SearchBox({ value, onChange }) {
    return (
        <View style={styles.searchSection}>
            <Ionicons style={styles.searchIcon} name="md-search" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#fff"
                defaultValue={value}
                onChangeText={onChange}
            />
        </View>
    );
}
