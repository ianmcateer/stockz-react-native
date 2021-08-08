import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";

import { Dimensions } from "react-native";

import { scaleSize } from "../constants/Layout";
import moment from "moment";
import { Colors } from "./styles";

const screenWidth = Dimensions.get("window").width;

export default function App({ symbol, priceSeries }) {
    const [state, setState] = useState({
        selectedPriceSeries: [],
    });
    const { selectedPriceSeries } = state;

    useEffect(() => {
        // Find the price series which matches the selected symbol
        const priceSeriesMatch = priceSeries.find(
            (series) => series.symbol === symbol
        );

        setState((prev) => ({
            ...prev,
            selectedPriceSeries: priceSeriesMatch,
        }));
    }, [symbol, priceSeries]);

    if (!selectedPriceSeries || selectedPriceSeries.length < 1) {
        return null;
    }

    const data = selectedPriceSeries.historical.map((item) => {
        return {
            y: item.close,
            x: item.date,
        };
    });

    return (
        <View style={styles.container}>
            <VictoryChart
                width={screenWidth}
                height={scaleSize(230)}
                domainPadding={scaleSize(0)}
                scale={{ x: "time" }}
                style={{
                    stroke: { fill: "white" },
                }}
            >
                <VictoryLine
                    data={data}
                    style={{
                        data: { stroke: Colors.green, strokeWidth: 1.4 },
                    }}
                    sortOrder="descending"
                />
                <VictoryAxis
                    dependentAxis={true}
                    style={{
                        axis: { stroke: "white" },
                        axisLabel: { fontSize: 20, padding: 30, fill: "white" },
                        ticks: { stroke: "white", size: 5 },
                        tickLabels: { fontSize: 15, padding: 5, fill: "white" },
                    }}
                />
                <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(x) => moment(x).format("MMM YY")}
                    style={{
                        axis: { stroke: "white" },
                        tickLabels: { fill: "white" },
                    }}
                />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202122",
    },
});
