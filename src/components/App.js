import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../FirebaseConfig";

function App() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <AppRouter isLogIn={isLogIn} />
  );
}

export default App;
