import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "./styles";

export const Loader = ({ loading }) => {
    if (!loading) return null;
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.blue} />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        position: "absolute",
        top: "50%",
        left: "45%",
    },
});
