import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../FirebaseConfig";


const Nav = styled.ul`
    height: 4em;
    width: 100vw;
    background-color: #0c2461;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
    

`;

const SLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

const NavList = styled.li`
    padding: 0.9em 2em;
    font-size: 1.5em;
    border-bottom : ${props => props.selected ? "solid 5px #42f2f5" : "transparent"};
    transition-duration: 0.4s;
`;

const LogMenu = styled.div`
    float: right;
    padding: 1em;
    cursor: pointer;
    display:flex;
    font-size: 1.2em;
`;

const Navigation = ({ userObj }) => {
    const location = useLocation();
    const history = useHistory();
    const Logout = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <>
            <Nav>
                <div style={{ "display": "flex" }}>
                    <NavList selected={location.pathname === "/"}><SLink to="/" >Home</SLink></NavList>
                    <NavList selected={location.pathname === "/profile"}><SLink to="/profile">Profile</SLink></NavList>
                </div>
                <LogMenu>
                    <div style={{ "marginRight": "2em" }}>{userObj.email}</div><div onClick={Logout}>Logout</div>
                </LogMenu>
            </Nav>
        </>
    )
}

export default Navigation;