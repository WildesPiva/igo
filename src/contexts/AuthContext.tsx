import { ReactNode, useState, useEffect, createContext } from 'react'
import { auth, firebase } from '../services/firebase'
import nookies from 'nookies';
// import Cookies from 'js-cookie'

type UserType = {
    id: string,
    name: string,
    avatar: string,
    email: string
}

type AuthContextType = {
    user: UserType | undefined
    signInWithGoogle: () => Promise<void>
    signOutFirebase: () => Promise<void>
}

type AuthContextProviderType = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
    const [user, setUser] = useState<UserType | null>(null)

    // listen for token changes
    // call setUser and write new token as a cookie
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, 'token', '', { path: '/' });
            } else {
                const token = await user.getIdToken();

                const { displayName, email, photoURL, uid } = user
                if (!displayName || !photoURL || !email) {
                    throw new Error("Missing information from Google Acount");
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email
                })
                nookies.set(undefined, 'token', token, { path: '/' });
            }
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        // clean up setInterval
        return () => clearInterval(handle);
    }, []);


    const signInWithGoogle = async () => {
        const authProviderGoogle = new firebase.auth.GoogleAuthProvider()
        authProviderGoogle.setCustomParameters({
            prompt: 'select_account'
        })
        const result = await auth.signInWithPopup(authProviderGoogle)

        if (result.user) {
            const { displayName, email, photoURL, uid } = result.user

            if (!displayName || !photoURL || !email) {
                throw new Error("Missing information from Google Acount");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                email
            })
        }

    }

    const signOutFirebase = async () => {
        await firebase.auth().signOut().then(() => {
            setUser(null)
            // Sign-out successful.
            // Cookies.remove('user')
            nookies.set(undefined, 'token', '', { path: '/' });
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOutFirebase
        }}>
            {children}
        </AuthContext.Provider>
    )
}
