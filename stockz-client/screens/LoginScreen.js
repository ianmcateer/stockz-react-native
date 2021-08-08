import React, { useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

import MyTextInput from "../components/TextInput";
import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    MsgBox,
} from "../components/styles";

import { login } from "../services/api";
import { useCredentialsContext } from "../contexts/CredentialsContext";

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { setStoredCredentials } = useCredentialsContext();

    const handleLogin = async ({ email, password }, setSubmitting) => {
        try {
            const { status, message, data } = await login({ email, password });
            await setStoredCredentials({ ...data }, message, status);
        } catch (err) {
            setSubmitting(false);
            handleMessage(JSON.stringify(err.response.data.message), "ERROR");
        }
    };

    const handleMessage = (message, type = "") => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <StyledContainer>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <InnerContainer>
                <PageLogo
                    resize="cover"
                    source={require("../assets/images/icon.png")}
                />
                <PageTitle>Stockz</PageTitle>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email == "" || values.password == "") {
                            handleMessage("Please fill in all fields");
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        isSubmitting,
                    }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email"
                                icon="mail"
                                placeholder="Email Address"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Password"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                icon="lock"
                                isPassword={true}
                                hidePassword={hidePassword}
                                secureTextEntry={hidePassword}
                                setHidePassword={setHidePassword}
                                value={values.password}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                                <StyledButton
                                    onPress={handleSubmit}
                                    disabled={
                                        values.email == "" ||
                                        values.password == ""
                                    }
                                >
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>
                            )}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator
                                        size="small"
                                        color={Colors.primary}
                                    />
                                </StyledButton>
                            )}
                            <ExtraView>
                                <ExtraText>
                                    Don't have an account already?
                                </ExtraText>
                                <TextLink
                                    onPress={() =>
                                        navigation.navigate("Signup")
                                    }
                                >
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

export default Login;
