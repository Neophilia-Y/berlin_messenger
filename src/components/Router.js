import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Navigation from "./Navigation"
import GlobalStyle from "./Globalstyle";
import CreateDash from "./CreateDash";
import DashBoard from "../routes/DashBoard";

const AppRouter = ({ isLogIn, userObj }) => {
    return (
        <Router>
            <GlobalStyle />
            {isLogIn && (<Navigation userObj={userObj} />)}
            <Switch>

                {isLogIn ? (<Route exact path="/"><Home userObj={userObj} /></Route>) : (<><Route exact path="/"><Auth /></Route></>)}
                <Route exact path="/profile">
                    <Profile userObj={userObj} />
                </Route>
                <Route exact path="/create" ><CreateDash userObj={userObj} /></Route>
                <Route exact path={`/dashboard/:id`}><DashBoard userObj={userObj} /></Route>
            </Switch>

        </Router>
    )
}

export default AppRouter;