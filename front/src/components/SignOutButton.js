import React from "react";
import { useMsal } from "@azure/msal-react";
import {  PrimaryButton } from "@fluentui/react";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <PrimaryButton onClick={() => handleLogout(instance)}>Sign out using Popup</PrimaryButton>
    );
}