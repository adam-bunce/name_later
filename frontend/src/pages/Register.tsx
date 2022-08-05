import React, { useState } from "react";
import {
    TextField,
    Grid,
    Typography,
    Button,
    Alert,
    Link,
} from "@mui/material";

import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerUser } from "../features/user/userSlice";

function Register() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    interface RegisterState {
        password: string;
        username: string;
        registerSuccess: boolean;
    }

    const [state, setState] = useState<RegisterState>({
        password: "",
        username: "",
        registerSuccess: false,
    });

    function updateStateOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    // Promise<T> vs Promise<any> ?
    const handleSubmit = async (): Promise<any> => {
        dispatch(
            registerUser({ username: state.username, password: state.password })
        )
            .unwrap()
            .then((response) => {
                setState({ ...state, registerSuccess: true });
            })
            .catch((err) => {
                //axios error
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
                        name="username"
                        autoComplete="username"
                        required
                        variant="outlined"
                        fullWidth
                        label="Username"
                        helperText={user.message.username}
                        error={user.message.username ? true : false}
                        onChange={updateStateOnChange}
                    />
                </Grid>
            </Grid>

            <Grid container item justifyContent="center">
                <Grid item xs={8} md={4}>
                    <TextField
                        required
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        variant="outlined"
                        fullWidth
                        label="Password"
                        helperText={user.message.password}
                        error={user.message.password ? true : false}
                        onChange={updateStateOnChange}
                    />
                </Grid>
            </Grid>

            {/* TODO handle unexpected errors better */}
            <div>{user.message.other}</div>

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
