import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "../FirebaseConfig";

import lake from "../assets/lake.jpg";
import snoopy from "../assets/snoopy.jpeg";
import tvTower from "../assets/tv_tower.jpg";




const Title = styled.div`
    text-align: center;
    font-size: 2em;
    color: #16a085;
`;
const DashContainer = styled.div`
    width: 90vw;
    height: 100vh;
    margin: 2em auto;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(400px, 1fr));

    grid-auto-rows: 40vh;
    grid-gap: 30px;

`;
const DashBoard = styled.div`

    border: 2px solid #2ecc71;
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
        transform: scale(1.2);
        
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
    background-color: white;
    color:#2ecc71;

`;
const CreateDash = styled.img`
    height: 70%;
    width: 100%;
    transform: scale(0.8);
    &:hover {
        transform: scale(1.0);
        
    }
    transition: transform .4s;
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
                    <Link to="/create">
                        <CreateDash src="https://cdn4.iconfinder.com/data/icons/document-31/200/374-512.png" />
                    </Link>
                </DashBoard>

                {dashList && dashList.length > 0 && dashList.map(dash => (
                    <DashBoard key={dash.id}>
                        <ImageContainer src={dash.attach} />
                        <DashTitle>{dash.title}</DashTitle>
                    </DashBoard>
                ))}

                <DashBoard>
                    <ImageContainer src={snoopy} />
                    <DashTitle>Snoopy picture</DashTitle>
                </DashBoard>
                <DashBoard>
                    <ImageContainer src={lake} />
                    <DashTitle>Lake picture</DashTitle>
                </DashBoard>
                <DashBoard>
                    <ImageContainer src={tvTower} />
                    <DashTitle>TV tower </DashTitle>
                </DashBoard>

                <DashBoard>
                    <ImageContainer src={snoopy} />
                    <DashTitle>Snoopy picture</DashTitle>
                </DashBoard>
                <DashBoard>
                    <ImageContainer src={tvTower} />
                    <DashTitle>TV tower </DashTitle>
                </DashBoard>
                <DashBoard>
                    <ImageContainer src={snoopy} />
                    <DashTitle>Snoopy picture</DashTitle>
                </DashBoard>
            </DashContainer>
        </>
    )
};

export default Home;