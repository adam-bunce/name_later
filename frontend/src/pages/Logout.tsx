import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Alert, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../app/hooks";
import { logOutUser } from "../features/user/userSlice";
import { resetState } from "../features/game/gameSlice";

function Logout() {
    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const logUserOut = async (): Promise<any> => {
            console.log("serverurl", process.env.REACT_APP_SERVER_URL);
            axios.defaults.withCredentials = true; // need this for creds to work
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/users/logout`, {})
                .then((data) => {
                    console.log(data);
                    dispatch(logOutUser());
                    setLoggedOut(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        dispatch(resetState());

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
