import React, { useEffect, useState } from "react";
import { dbService } from "../FirebaseConfig";

const Home = ({ userObj }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const getData = () => {
        dbService.collection("messages").onSnapshot(snapshot => {
            const newArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            )
            new
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
        await dbService.collection("messages").add({
            text: message,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setMessage("");
    }
    return (
        <>
            <h2>"Let's talk what we have to solve"</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="message" placeholder="Write something" value={message} onChange={onChange} />
                <input type="submit" />
            </form>
            <div>
                {messages.map(m => (<h3 key={m.id}>{m.text}</h3>))}

            </div>
        </>
    )
};

export default Home;