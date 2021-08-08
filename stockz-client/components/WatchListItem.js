import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaleSize } from "../constants/Layout";
import { Colors } from "../components/styles";

export const WatchListItem = ({
    priceSeries,
    symbol,
    showPercentageChange,
    setShowPercentageChange,
}) => {
    return (
        <View
            style={{
                ...styles.stockItem,
                backgroundColor: symbol === symbol ? "#373839" : "#000",
            }}
        >
            <Text style={styles.symbol}>{symbol}</Text>
            <View style={styles.stockItemRightContainer}>
                <Text style={styles.closingPrice}>
                    {priceSeries && priceSeries.close.toFixed(2)}
                </Text>

                <View
                    style={{
                        ...styles.percentageGainOrLossContainer,
                        backgroundColor:
                            priceSeries && priceSeries.changePercent >= 0
                                ? Colors.green
                                : Colors.red,
                    }}
                >
                    <Text
                        style={styles.percentageGainOrLoss}
                        onPress={() => {
                            setShowPercentageChange(!showPercentageChange);
                        }}
                    >
                        {showPercentageChange
                            ? `${priceSeries.changePercent}%`
                            : priceSeries.change}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stockItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scaleSize(10),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: "#2F2F2F",
    },

    symbol: {
        color: "#fff",
        fontSize: scaleSize(20),
    },

    stockItemRightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    closingPrice: {
        color: "#fff",
        fontSize: scaleSize(20),
        marginRight: scaleSize(20),
    },

    percentageGainOrLoss: {
        color: "#fff",
        fontSize: scaleSize(20),
        paddingRight: scaleSize(5),
    },

    percentageGainOrLossContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",

        width: scaleSize(100),
        height: scaleSize(35),
        borderRadius: scaleSize(10),
    },
});
