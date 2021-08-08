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
import { signup } from "../services/api";

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleMessage = (message, type = "") => {
        setMessage(message);
        setMessageType(type);
    };

    const handleSignup = async ({ email, password }, setSubmitting) => {
        handleMessage(null);
        try {
            await signup({
                email,
                password,
            });
            handleMessage("Registered! Please login", "SUCCESS");
            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
            handleMessage(JSON.stringify(err.message));
        }
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
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (
                            values.email == "" ||
                            values.password == "" ||
                            values.confirmPassword == ""
                        ) {
                            handleMessage("Please fill in all fields");
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword) {
                            handleMessage("Passwords do not match");
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
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
                                label="Email Address"
                                placeholder="andyj@gmail.com"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                keyboardType="email-address"
                                icon="mail"
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
                            <MyTextInput
                                label="Confirm Password"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                icon="lock"
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                                <StyledButton
                                    onPress={handleSubmit}
                                    disabled={
                                        values.email == "" ||
                                        values.password == "" ||
                                        values.confirmPassword == ""
                                    }
                                >
                                    <ButtonText>Signup</ButtonText>
                                </StyledButton>
                            )}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator
                                        size="large"
                                        color={Colors.primary}
                                    />
                                </StyledButton>
                            )}
                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

export default Signup;
