import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { scaleSize } from "../constants/Layout";

function ErrorMessage({ children }) {
    if (!children) return null;
    return <Text style={styles.errorMessage}>{children}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: scaleSize(15),
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
    },
});
