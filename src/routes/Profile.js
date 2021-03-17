import React, { useEffect, useState } from "react";
import { authService, dbService, storageService } from "../FirebaseConfig";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
    const [changeName, setChangeName] = useState("");
    const [newArray, setNewArray] = useState([]);
    const history = useHistory();
    const onLogOut = (e) => {
        authService.signOut();
        history.push("/");
    }
    const onChange = e => {
        const { target: { value } } = e;
        setChangeName(value)

    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if (changeName !== userObj.displayName) {
            await userObj.updateProfile({ displayName: changeName })
            setChangeName("");
        }
    }

    const getMessage = async () => {
        const messages = await dbService.collection("messages").where("creatorId", "==", userObj.uid).orderBy("createdAt", "desc").get();
        const newList = [];
        await messages.docs.map(async (doc) => {
            const message = await doc.data().text;
            newList.push(message);
        });

        setNewArray(newList);
    }
    useEffect(() => {
        getMessage();
    }, [])
    return (
        <>
            <h2>"Profile"</h2>
            <button onClick={onLogOut}>Log out</button>
            <div>
                <h3>hellow {userObj.displayName || userObj.email}</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Change your Nickname" onChange={onChange} value={changeName} />
                    <input type="submit" value="Change" />
                </form>
            </div>
            <div>
                <h2>My Record</h2>
                {newArray && newArray.map((m, index) => (<h4 key={index}>message: {m}</h4>))}
            </div>

        </>);
}


export default Profile;