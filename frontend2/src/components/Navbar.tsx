import React from "react";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

// TODO need to conditionally render username and logout/login options

function Navbar() {
    const user = useAppSelector((state) => state.user);
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Grid container direction="row" alignItems={"center"}>
                        <Grid item xs={6} md={8}>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h4" color="#FFFFFF">
                                    Home
                                </Typography>
                            </Link>
                        </Grid>
                        {/*TODO style this better */}
                        {user.username ? (
                            <>
                                <Grid item xs={3} md={2}>
                                    <Link
                                        to="/logout"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography variant="h6" color="white">
                                            Logout
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={3} md={2} alignItems="center">
                                    <Link
                                        to="/profile"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography variant="h6" color="white">
                                            {user.username}
                                        </Typography>
                                    </Link>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={3} md={2}>
                                    <Typography variant="h6">
                                        <Link to="/login" color="inherit">
                                            Login
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={2} alignItems="center">
                                    <Typography variant="h6">
                                        <Link to="/register">Register</Link>
                                    </Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* should to custom style theme or whatver and then make the padding be an equation but this works more or less idk if navbar height is exactly 10 though*/}
            <Box pb={10} />
        </>
    );
}

export default Navbar;
