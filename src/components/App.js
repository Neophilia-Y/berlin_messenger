import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../FirebaseConfig";

function App() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
        setUserObj(user);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {init ? (<AppRouter isLogIn={isLogIn} userObj={userObj} />) : "initializing......"}

    </>
  );
}

export default App;
