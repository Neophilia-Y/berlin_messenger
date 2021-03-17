import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../FirebaseConfig";
import Message from "../components/Message";
import { v4 as uuidv4 } from 'uuid';

const DashBoard = ({ userObj }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();

    const getData = () => {
        dbService.collection("messages").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            const newArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            )
            setMessages(newArray);

        });
    }
    useEffect(() => {
        getData();
    }, []);

    const onChange = (e) => {
        const { target: { value } } = e;
        setMessage(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = ""
        if (attachment !== "") {
            const storageRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await storageRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();

        }
        await dbService.collection("messages").add({
            text: message,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachment: attachmentUrl,
        })
        setMessage("");
        setAttachment("");
    }
    const fileChange = (e) => {
        const { target: { files } } = e;
        const reader = new FileReader();
        reader.onloadend = (finishNoti) => {
            const { currentTarget: { result: dataUrl } } = finishNoti;
            setAttachment(dataUrl);
        }
        reader.readAsDataURL(files[0]);
    }
    const onClear = () => {
        fileInput.current.value = null;
        setAttachment(null);

    }

    return (
        <>
            <h2>"Let's talk what we have to solve"</h2>
            <form onSubmit={onSubmit}>
                <input ref={fileInput} type="file" accept="image/*" onChange={fileChange} />
                <input type="text" name="message" placeholder="Write something" value={message} onChange={onChange} />
                <input type="submit" />
                {attachment &&
                    (<div>
                        <img src={attachment} width="50px" />
                        <button onClick={onClear}>Clear</button>
                    </div>)}
            </form>
            <div>
                {messages.map(m => (<Message key={m.id} messageInfo={m} userCheck={userObj.uid === m.creatorId} />))}
            </div>

        </>
    )
};

export default DashBoard;