import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "../FirebaseConfig";


const Title = styled.div`
    text-align: center;
    font-size: 2em;
    color: #0c2461;
`;
const DashContainer = styled.div`
    width: 90vw;
    height: auto;
    margin: 2em auto;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(400px, 1fr));

    grid-auto-rows: 40vh;
    grid-gap: 30px;

`;
const DashBoard = styled.div`

    border: 2px solid #4a69bd;
    border-radius: 20px;
    color: red;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const ImageContainer = styled.img`
    height: 80%;
    width: 100%;
    &:hover {
        transform: scale(1.1);
    }
    transition: transform .2s;

`;
const DashTitle = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #4a69bd;
    color: white;

`;
const CreateDash = styled.img`

    height: 80%;
    transform: scale(0.8);
    &:hover {
        transform: scale(1.0);
        
    }
    transition: transform .4s;
`;

const SLink = styled(Link)`
    width: 100%;
    height: 100%;
    text-align: center;
    text-decoration: none;
`;


const Home = ({ userObj }) => {
    const [dashList, setDashList] = useState([]);
    useEffect(() => {
        dbService.collection("Berlin").orderBy("createAt", "desc").onSnapshot(snapshot => {
            const r = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setDashList(r);
        })
    }, []);

    return (
        <>
            <Title>Berlin Local Story</Title>
            <DashContainer>
                <DashBoard>
                    <SLink to="/create">
                        <CreateDash src="https://cdn4.iconfinder.com/data/icons/document-31/200/374-512.png" />
                    </SLink>
                </DashBoard>

                {dashList && dashList.length > 0 && dashList.map(dash => (
                    <DashBoard key={dash.id}>
                        <SLink to={`/dashboard/${dash.id}`} >

                            <ImageContainer src={dash.attach} />

                            <DashTitle>{dash.title}</DashTitle>

                        </SLink>
                    </DashBoard>
                ))}




            </DashContainer>
        </>
    )
};

export default Home;