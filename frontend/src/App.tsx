import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import axios from "axios";
import { useAppDispatch } from "./app/hooks";
import { logInUser } from "./features/user/userSlice";
function App() {
    const dispatch = useAppDispatch();

    // try to log user in w/ jwt on app load, if it doesnt exist the user doesnt get logged in
    // maybe i can move this into redux
    // this hits a diff endpoint thatn the usualy login function, maybe
    // make another async thunk to handle this
    useEffect(() => {
        const checkLoggedin = async () => {
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/users/me`, {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.data.user) {
                        console.log(response.data.user.username);
                        dispatch(
                            logInUser({
                                username: response.data.user.username,
                                id: response.data.user.id,
                            })
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        checkLoggedin();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
