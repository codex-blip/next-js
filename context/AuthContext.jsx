'use client'

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(); 

export function useAuth(){
    return useContext(AuthContext);
}

export default function AuthProvider(props) {
    const {children} = props;
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    function signup(email, password) {
        // Implement signup logic here
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setCurrentUser(null);
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , async (user) =>{
            console.log("Auth state changed")
            setIsLoadingUser(true);
            try {
                setCurrentUser(user);
                if (!user){
                    throw Error("No user found");
                }

            }
            catch (error) {
                console.error("Error fetching user data:", error);
            }finally {
                setIsLoadingUser(false);
            }
        })
        return unsubscribe;
    },[])

    const value = {
        currentUser,isLoadingUser,signup,login,logout,resetPassword
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  )
}
 