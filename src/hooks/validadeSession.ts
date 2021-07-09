import nookies from 'nookies';
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { auth } from '../services/firebaseAdmin';

export const validadeSession = async (context: GetServerSidePropsContext) => {
    const login = `/login?redirected=true&to=${context.resolvedUrl}`;

    try {

        const cookies = nookies.get(context);
        const token = await auth.verifyIdToken(cookies.token);

        // the user is authenticated!
        return token;

        // FETCH STUFF HERE!! 🚀

        // return {
        //     props: { message: `Your email is ${email} and your UID is ${uid}.` },
        // };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page

        if (context.res) {
            context.res.writeHead(302, {
                Location: login,
            });
            context.res.end();
        } else {
            Router.replace(login);
        }

        // `as never` prevents inference issues
        // with InferGetServerSidePropsType.
        // The props returned here don't matter because we've
        // already redirected the user.
        // return { props: {} as never };
    }
}
