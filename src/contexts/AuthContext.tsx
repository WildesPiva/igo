import { ReactNode, useState, useEffect, createContext } from 'react'
import { auth, firebase } from '../services/firebase'
import Cookies from 'js-cookie'

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
    const [user, setUser] = useState<UserType>()

    useEffect(() => { if (user) Cookies.set('user', user) }, [user])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
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
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const signInWithGoogle = async () => {
        const authProviderGoogle = new firebase.auth.GoogleAuthProvider()

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
            setUser(undefined)
            // Sign-out successful.
            Cookies.remove('user')
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
