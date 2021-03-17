import React, { useState } from "react";
import { authService, firebaseInstance } from "../FirebaseConfig";


const Auth = () => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(emailInput, passwordInput);
            } else {
                data = await authService.signInWithEmailAndPassword(emailInput, passwordInput);
            }
        }
        catch (error) {
            setErrorMessage(error.message)
        }
    }
    const onChange = (e) => {
        const { target: { value, name } } = e;
        if (name === "email") {
            setEmailInput(value);
        } else if (name === "password") {
            setPasswordInput(value);
        }
    }
    const toggle = () => {
        setNewAccount(!newAccount);

    }

    const signUp = async (e) => {
        const { target: { name } } = e;

        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data, "Sign Up Success!")
    }


    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={emailInput} name="email" type="email" placeholder="Insert your email" />
                <input onChange={onChange} valune={passwordInput} name="password" type="password" placeholder="Password" />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                <h3>{errorMessage}</h3>
            </form>
            <button onClick={toggle}>{newAccount ? "Log In" : "Create Account"}</button>
            <hr />
            <button name="google" onClick={signUp}>Google</button>


        </>)
};

export default Auth;