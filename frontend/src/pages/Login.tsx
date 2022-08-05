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
import { loginUser } from "../features/user/userSlice";
import { resetState } from "../features/game/gameSlice";

function Login() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    interface RegisterState {
        password: string;
        username: string;
        loginSuccess: boolean;
    }

    const [state, setState] = useState<RegisterState>({
        password: "",
        username: "",
        loginSuccess: false,
    });

    function updateStateOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (): Promise<any> => {
        dispatch(
            loginUser({
                username: state.username,
                password: state.password,
            })
        )
            .unwrap()
            .then(() => {
                setState({
                    ...state,
                    loginSuccess: true,
                });
                dispatch(resetState());
            })
            .catch((err) => {
                // login failed axios error
            });
    };

    let loggedInPopup = <></>;

    if (state.loginSuccess || user.userId) {
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
                        name="username"
                        type="username"
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
                        name="password"
                        required
                        type="password"
                        autoComplete="current-password"
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
