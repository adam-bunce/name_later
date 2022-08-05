import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Alert, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logOutUser } from "../features/user/userSlice";
function Logout() {
    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const logUserOut = async (): Promise<any> => {
            console.log("serverurl", process.env.REACT_APP_SERVER_URL);
            axios.defaults.withCredentials = true; // need this for creds tow ork
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/users/logout`, {})
                .then((data) => {
                    console.log(data);
                    dispatch(logOutUser());
                    setLoggedOut(true);
                    //  localStorage.removeItem("user");
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        logUserOut().catch((err) => console.log(err));
    }, []);

    let loggedOutElement = <CircularProgress />;
    if (loggedOut) {
        loggedOutElement = <Alert variant="filled">{"Logged Out "}</Alert>;
    }

    return (
        <>
            <Navbar />
            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4} justifyContent="center" container>
                    {loggedOutElement}
                </Grid>
            </Grid>
        </>
    );
}

export default Logout;
