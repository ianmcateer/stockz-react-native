import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

import { useStocksContext } from "../contexts/StocksContext";
import { PageTitle } from "../components/styles";
import { fetchHistorialPrice } from "../services/api";
import { Loader } from "../components/Loader";
import { StockDetail } from "../components/StockDetail";
import { WatchListItem } from "../components/WatchListItem";

export default function StocksScreen({ navigation }) {
    const [selectedStock, setSelectedStock] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [priceSeries, setPriceSeries] = useState([]);
    const [showPercentageChange, setShowPercentageChange] = useState(true);

    // Grab stock data from the server which is stored in the shared context
    const { watchList } = useStocksContext();

    // For each symbol in the watchList fetch the daily historical price
    // if the symbol already exists in the price series don't fetch it again
    const fetchSymbolsPriceSeries = async () => {
        setIsLoading(true);

        const newSymbols = watchList.filter(
            ({ symbol }) =>
                priceSeries.findIndex(
                    (priceItem) => priceItem.symbol === symbol
                ) == -1
        );

        if (!newSymbols.length) return;

        try {
            const response = await Promise.all(
                newSymbols.map(async ({ symbol }) => {
                    const { data } = await fetchHistorialPrice(symbol, 356);

                    return data;
                })
            );

            // Sort the data by symbol A-Z as well
            const unsortedArray = [...priceSeries, ...response];
            const sorted = unsortedArray.sort((a, b) =>
                a.symbol.localeCompare(b.symbol)
            );
            setPriceSeries(sorted);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!watchList || !watchList.length) {
            return;
        }
        fetchSymbolsPriceSeries();
    }, [watchList]);

    const onSelectStock = (symbol) => {
        const selectedSeries = priceSeries.find(
            (item) => item.symbol === symbol
        );
        setSelectedStock(selectedSeries);
    };

    return (
        <View style={styles.container}>
            <View style={styles.stockList}>
                <PageTitle>Stocks</PageTitle>
                <Loader loading={isLoading} />
                <ScrollView>
                    {priceSeries && priceSeries.length
                        ? priceSeries.map(({ historical, symbol }) => (
                              <TouchableOpacity
                                  onPress={() => onSelectStock(symbol)}
                                  key={symbol}
                              >
                                  <WatchListItem
                                      priceSeries={historical && historical[0]}
                                      symbol={symbol}
                                      showPercentageChange={
                                          showPercentageChange
                                      }
                                      setShowPercentageChange={
                                          setShowPercentageChange
                                      }
                                  />
                              </TouchableOpacity>
                          ))
                        : null}
                </ScrollView>
            </View>
            {selectedStock ? (
                <View>
                    <StockDetail
                        selectedStock={selectedStock || {}}
                        setSelectedStock={setSelectedStock}
                        priceSeries={priceSeries}
                    />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },

    stockList: {
        flex: 2,
    },
});
