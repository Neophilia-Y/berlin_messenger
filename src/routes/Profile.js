import React from "react";
import { authService } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogOut = (e) => {
        authService.signOut();
        history.push("/");
    }
    return (
        <>
            <h2>"Profile"</h2>
            <button onClick={onLogOut}>Log out</button>
        </>);
}


export default Profile;