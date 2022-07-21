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

import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

function Register() {
    interface RegisterState {
        password: string;
        passwordError: boolean;
        passwordErrorMessage: string;

        username: string;
        usernameError: boolean;
        usernameErrorMessage: string;

        otherErrorMessage: string;
        registerSuccess: boolean;
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
        registerSuccess: false,
    });

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
    const handleSubmit = async (): Promise<any> => {
        await axios
            .post(
                "http://localhost:8000/users/register",
                { username: state.username, password: state.password },
                { withCredentials: true } // need for cookies?
            )
            .then((data) => {
                console.log(data);
                // dispatch(logInUser(userInfo))
                // update redux store
                // redirect to
                setState({
                    ...state,
                    registerSuccess: true,
                });
            })
            .catch((err) => {
                updateErrorMessages(err.response.data);
            });
    };

    let registeredPopup = <></>;

    if (state.registerSuccess) {
        registeredPopup = (
            <>
                <Navigate replace to="/" />;
                <Grid container item justifyContent="center">
                    <Grid item xs={8} md={4}>
                        <Alert variant="filled">
                            {"Registered, if not redirected click "}
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
            {/* this looks super cringe but 
            https://stackoverflow.com/questions/50610049/how-to-organize-material-ui-grid-into-rows 
            nesting grids is the way to do it without messing  w/ sx prop */}

            <Grid container item pb={5}>
                <Navbar />
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
                <Grid item xs={8}>
                    <Typography align="center" variant="h3">
                        {"Register"}
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
                        type="new-password" // google wants this instead of password
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

            {registeredPopup}

            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {"Register"}
                    </Button>
                </Grid>
            </Grid>
            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <Typography align="center">
                        {"already have an account? "}
                        <Link href="/login"> {"login"}</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Register;
