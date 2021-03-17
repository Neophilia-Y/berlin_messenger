import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { dbService, storageService } from "../FirebaseConfig";
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    width: 40%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content : space-between;

`;
const TitleInput = styled.input`
    border: 2px solid #2ecc71;
    border-radius: 10px;
    padding:10px;
    outline: none;
`;

const DesInput = styled.textarea`
border: 2px solid #2ecc71;
border-radius: 10px;
padding:10px;
outline:none;
`;
const CreateBtn = styled.input`
    width: 40%;
    height: 30px;
    margin-left: auto;
    margin-right: auto;
`;


const CreateDash = ({ userObj }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [attach, setAttach] = useState("");
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        let downloadUrl = "";
        if (attach) {
            const storageRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await storageRef.putString(attach, "data_url");
            downloadUrl = await response.ref.getDownloadURL();

        } else {
            downloadUrl = "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg";
        }

        if (window.confirm("Upload on DashBoard?")) {
            await dbService.collection("Berlin").add({
                title: title,
                description: description,
                attach: downloadUrl,
                createAt: Date.now(),
                userId: userObj.uid,
            })
            history.push("/");
        }


    }

    const fileChange = (e) => {
        const { target: { files } } = e;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = (finishRead) => {
            const { currentTarget: { result } } = finishRead;
            setAttach(result);
        }

    }
    const changeTitle = e => {
        const { target: { value } } = e;
        setTitle(value);
    }
    const changeDes = e => {
        const { target: { value } } = e;
        setDescription(value);
    }

    return (
        <>
            <Container>
                <Form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <TitleInput id="title" onChange={changeTitle} value={title} type="text" placeholder="Title" />
                    <label htmlFor="description">Description</label>
                    <DesInput id="description" onChange={changeDes} value={description} rows="20" cols="33">
                        "What kind of information do you have?"
                    </DesInput>
                    <input type="file" accept="image/*" onChange={fileChange} />
                    <CreateBtn type="submit" value="Create" />
                </Form>
            </Container>
        </>
    );
}

export default CreateDash;