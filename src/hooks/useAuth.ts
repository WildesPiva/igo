import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const validateLogin = (context: GetServerSidePropsContext) => {
    const { user } = context.req.cookies;
    const login = `/login?redirected=true&to=${context.resolvedUrl}`;

    if (!user) {
        // Handle server-side and client-side rendering.
        if (context.res) {
            context.res?.writeHead(302, {
                Location: login,
            });
            context.res?.end();
        } else {
            Router.replace(login);
        }
    }
}