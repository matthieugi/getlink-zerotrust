import React from "react";
import { useIsAuthenticated} from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { AnimationClassNames, mergeStyles, getTheme } from '@fluentui/react/lib/Styling';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <div className={contentClass}>
                
                { isAuthenticated ? <SignOutButton/> : <SignInButton /> }
            </div>
            
            <br />
            <br />
            {props.children}
        </>
    );
};

const theme = getTheme();
const contentClass = mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    lineHeight: '50px',
    padding: '0 20px',
  },
  AnimationClassNames.scaleUpIn100,
]);