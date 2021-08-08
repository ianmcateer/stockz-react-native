import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { scaleSize } from "../constants/Layout";
import Chart from "./Chart";

const screenWidth = Dimensions.get("window").width;

export const StockDetail = ({
    selectedStock,
    setSelectedStock,
    priceSeries,
}) => {
    const { symbol, historical } = selectedStock;

    if (!historical) return null;
    const priceData = historical && historical[0];

    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            indicatorStyle="white"
        >
            <View style={styles.stockDetail}>
                <TouchableOpacity
                    style={styles.stockHeader}
                    onPress={() => setSelectedStock()}
                >
                    <Text style={styles.stockName}>{symbol}</Text>
                </TouchableOpacity>
                <StockDetailRow
                    propertyKeys={["OPEN", "LOW"]}
                    propertyValues={[priceData.open, priceData.low]}
                />
                <StockDetailRow
                    propertyKeys={["CLOSE", "HIGH"]}
                    propertyValues={[priceData.close, priceData.high]}
                />
                <StockDetailRow
                    propertyKeys={["VOLUME"]}
                    propertyValues={[priceData.volume]}
                />
            </View>
            <View style={{ height: "100%" }}>
                <Chart symbol={symbol} priceSeries={priceSeries} />
            </View>
        </ScrollView>
    );
};

function StockDetailRow({ propertyKeys, propertyValues }) {
    return (
        <View style={styles.stockDetailRow}>
            <StockDetailProperty
                propertyName={propertyKeys.length > 0 ? propertyKeys[0] : ""}
                propertyValue={
                    propertyValues.length > 0 ? propertyValues[0] : ""
                }
            />

            <StockDetailProperty
                propertyName={propertyKeys.length > 1 ? propertyKeys[1] : ""}
                propertyValue={
                    propertyValues.length > 1 ? propertyValues[1] : ""
                }
            />
        </View>
    );
}

function StockDetailProperty({ propertyName, propertyValue }) {
    return (
        <View style={styles.stockProperty}>
            <Text style={styles.stockPropertyName}>{propertyName}</Text>
            <Text style={styles.stockPropertyValue}>{propertyValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    stockDetail: {
        backgroundColor: "#202122",
        width: screenWidth,
        height: scaleSize(200),
    },

    stockHeader: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: scaleSize(0.5),
        borderBottomColor: "#BCBCBC",
        flex: 1,
    },

    stockName: {
        color: "#fff",
        fontSize: scaleSize(20),
        fontWeight: "bold",
    },

    stockDetailRow: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: scaleSize(1),
        borderBottomColor: "#404142",
    },

    stockProperty: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scaleSize(3),
    },

    stockPropertyName: {
        color: "#616263", //grey
    },

    stockPropertyValue: {
        color: "#fff",
        fontSize: scaleSize(15),
    },
});
