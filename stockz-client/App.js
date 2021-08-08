import React from "react";

import RootStack from "./navigators/RootStack";
import { CredentialsProvider } from "./contexts/CredentialsContext";

export default function App() {
    return (
        <CredentialsProvider>
            <RootStack />
        </CredentialsProvider>
    );
}
