import { Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import {
    Colors,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
} from "./styles";

const TextInput = ({
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...props
}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon
                    onPress={() => {
                        setHidePassword(!hidePassword);
                    }}
                >
                    <Ionicons
                        name={hidePassword ? "md-eye-off" : "md-eye"}
                        size={30}
                        color={Colors.darkLight}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default TextInput;
