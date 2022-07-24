import React, { useState } from "react";
import {
    TextField,
    Grid,
    Typography,
    Button,
    Alert,
    Link,
} from "@mui/material";
import axios from "axios";

import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, logInUser } from "../features/user/userSlice";

function Login() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    interface RegisterState {
        password: string;
        passwordError: boolean;
        passwordErrorMessage: string;

        username: string;
        usernameError: boolean;
        usernameErrorMessage: string;

        otherErrorMessage: string;
        loginSuccess: boolean;
    }

    interface ErrorsObject {
        username: string;
        password: string;
        other: string;
    }

    const [state, setState] = useState<RegisterState>({
        password: "",
        passwordError: false,
        passwordErrorMessage: "",

        username: "",
        usernameError: false,
        usernameErrorMessage: "",

        otherErrorMessage: "",
        loginSuccess: false,
    });

    // e.target.name: e.target.value

    function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            ...state,
            password: e.target.value,
            passwordError: false,
            passwordErrorMessage: "",
        });
        console.log(state);
    }

    function updateUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            ...state,
            username: e.target.value,
            usernameError: false,
            usernameErrorMessage: "",
        });
        console.log(state);
    }

    function updateErrorMessages(errors: ErrorsObject) {
        if (errors.username) {
            setState({
                ...state,
                usernameError: true,
                usernameErrorMessage: errors.username,
            });
        }

        if (errors.password) {
            setState({
                ...state,
                passwordError: true,
                passwordErrorMessage: errors.password,
            });
        }

        if (errors.other) {
            console.log(errors.other);
            setState({
                ...state,
                otherErrorMessage: errors.other,
            });
        }
    }

    // Promise<T> vs Promise<any> ?
    // should of written an async thunk
    const handleSubmit = async (): Promise<any> => {
        dispatch(
            loginUser({ username: state.username, password: state.password })
        );

        // await axios
        //     .post(
        //         "http://localhost:8000/users/login",
        //         { username: state.username, password: state.password },
        //         { withCredentials: true } // need for cookies?
        //     )
        //     .then((response) => {
        //         console.log(response.data.username);
        //         // dispatch(logInUser(userInfo))
        //         // dispatch(updateUsername())
        //         dispatch(logInUser(response.data.username));
        //         // update redux store
        //         // redirect to
        //         setState({
        //             ...state,
        //             loginSuccess: true,
        //         });
        //     })
        //     .catch((err) => {
        //         updateErrorMessages(err.response.data);
        //     });
    };

    let loggedInPopup = <></>;

    if (state.loginSuccess) {
        loggedInPopup = (
            <>
                <Navigate replace to="/" />;
                <Grid container item justifyContent="center">
                    <Grid item xs={8} md={4}>
                        <Alert variant="filled">
                            {"Logged In, if not redirected click "}
                            <Link href="/" color="#FFFFFF">
                                {"here"}
                            </Link>
                        </Alert>
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <Grid
            component="form"
            container
            justifyContent="center"
            spacing={2}
            pt={4}
        >
            <Grid container item pb={5}>
                <Navbar />
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
                <Grid item xs={8}>
                    <Typography align="center" variant="h3">
                        {"Login"}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <TextField
                        type="username"
                        required
                        variant="outlined"
                        fullWidth
                        label="Username"
                        helperText={state.usernameErrorMessage}
                        error={state.usernameError}
                        onChange={updateUsername}
                    />
                </Grid>
            </Grid>

            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <TextField
                        required
                        type="password" // google wants this instead of password
                        variant="outlined"
                        fullWidth
                        label="Password"
                        helperText={state.passwordErrorMessage}
                        error={state.passwordError}
                        onChange={updatePassword}
                    />
                </Grid>
            </Grid>

            {/* TODO handle unexpected errors better */}
            <div>{state.otherErrorMessage}</div>

            {loggedInPopup}

            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {"Login"}
                    </Button>
                </Grid>
            </Grid>
            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <Typography align="center">
                        {"don't have an account? "}
                        <Link href="/register"> {"register"}</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;
