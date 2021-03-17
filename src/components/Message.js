import React, { useState } from "react";
import { dbService, storageService } from "../FirebaseConfig"

const Message = ({ messageInfo, userCheck, dashId }) => {
    const [editing, setEditing] = useState(false);
    const [newMessage, setNewMessage] = useState(messageInfo.text);
    const onDelete = async (e) => {
        const confirmCheck = window.confirm("Do you want delete this Message?");
        if (confirmCheck) {
            if (messageInfo.attachment !== "") {
                await storageService.refFromURL(messageInfo.attachment).delete();
            }
            await dbService.collection("Berlin").doc(`${dashId}/messages/${messageInfo.id}`).delete();
        }
    }
    const toggleModify = () => {
        setEditing(prev => !prev)
    }
    const onModify = (e) => {
        e.preventDefault();
        dbService.collection("Berlin").doc(`${dashId}/messages/${messageInfo.id}`).update({ text: newMessage });
        setEditing(false);
    }
    const onChange = (e) => {
        const { target: { value } } = e;
        setNewMessage(value);
    }
    return (
        <div>
            {editing ? (
                <form onSubmit={onModify}>
                    <input type="text" placeholder="Modify message" onChange={onChange} value={newMessage} />
                    <input type="submit" value="Submit" />
                </form>
            ) : (<>
                <h3>{messageInfo.text}</h3>
                <img src={messageInfo.attachment} width="100px" />
                {userCheck && (<>
                    <button onClick={toggleModify}>Modify</button>
                    <button onClick={onDelete}>Delete</button></>)}

            </>)
            }
        </div>
    )
}

export default Message;