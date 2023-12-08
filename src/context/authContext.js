import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "../config/firebaseConfig"
import {GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

//Declaracion de contexto
const authContext = createContext()
export function AuthProvider({children}){
    //Register
    const signUp = (email,password) => {
        //Recordar que el try-cath captura el error solo si se retorna el createUser...
       return createUserWithEmailAndPassword(auth,email,password);
    }
    //Loading
    const [isLoading,setIsLoading]=useState(true);
    //Login by form
    const login = (email,password) => {
        //Recordar que el try-cath captura el error solo si se retorna el createUser...
           return signInWithEmailAndPassword(auth,email,password);
        }
    //Login with Google
    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth,googleProvider)
    }
    //User information
    const [user,setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setIsLoading(false);
        })
    },[])
    //Out 
    const logOut = () =>signOut(auth)
    //Reset Password
    const resetPassword = (email) => sendPasswordResetEmail(auth,email);
    return (
        <authContext.Provider value={{
            signUp,
            isLoading,
            logOut,
            login,
            loginWithGoogle,
            user,
            resetPassword}}>
                {children}
        </authContext.Provider>
    );
}

//Hook personalizado
export const useAuth = () => useContext(authContext);