import React, { useEffect, useState } from "react";
import { dbService } from "../FirebaseConfig";

const Home = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const getData = async () => {
        const data = await dbService.collection("messages").get()
        data.forEach(document => {
            setMessages(prev => [{
                id: document.id, ...document.data()
            }, ...prev]
            );
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
            message,
            createdAt: Date.now(),
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
                {messages.map(m => (<h3 key={m.id}>{m.message}</h3>))}
            </div>
        </>
    )
};

export default Home;