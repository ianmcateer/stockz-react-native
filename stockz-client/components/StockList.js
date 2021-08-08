import React from "react";
import { memo } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import { scaleSize } from "../constants/Layout";

export const StockList = ({ stocks, addStockToWatchList }) => {
    return (
        <FlatList
            data={stocks}
            renderItem={({ item: stock, index }) => (
                <TouchableOpacity
                    onPress={() => addStockToWatchList(stock)}
                    key={stock.symbol}
                >
                    <StockListItem stock={stock} />
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.symbol}
        />
    );
};

class StockListItem extends React.PureComponent {
    render() {
        const { stock } = this.props;
        return (
            <View style={styles.stockListItem}>
                <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                <Text style={styles.stockName}>{stock.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stockListItem: {
        paddingBottom: scaleSize(10),
        borderBottomColor: "#2F2F2F",
        borderBottomWidth: scaleSize(1),
    },

    stockSymbol: {
        paddingHorizontal: scaleSize(10),
        paddingTop: scaleSize(10),
        color: "#fff",
        fontSize: scaleSize(20),
    },

    stockName: {
        paddingHorizontal: scaleSize(10),
        color: "#fff",
    },
});
