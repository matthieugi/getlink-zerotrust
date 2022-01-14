import React from "react";
import { useMsal } from "@azure/msal-react";
//import { loginRequest } from "./authConfig";
import {  PrimaryButton } from "@fluentui/react";

function handleLogin(instance) {
    instance.loginPopup(/*loginRequest*/).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <PrimaryButton  onClick={() => handleLogin(instance)}>Sign in using Popup</PrimaryButton>
    );
}