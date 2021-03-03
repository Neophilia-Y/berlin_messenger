import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Navigation from "./Navigation"


const AppRouter = ({ isLogIn }) => {
    return (
        <Router>
            {isLogIn && (<Navigation />)}

            <Switch>

                {isLogIn ? (<Route exact path="/"><Home /></Route>) : (<><Route exact path="/"><Auth /></Route></>)}
                <Route path="/profile" component={Profile} />
            </Switch>


        </Router>)
}

export default AppRouter;