import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

function Navbar() {
    const user = useAppSelector((state) => state.user);
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Grid container direction="row" alignItems={"center"}>
                        <Grid item xs={6} md={10}>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <Typography variant="h4" color="#FFFFFF">
                                    Home
                                </Typography>
                            </Link>
                        </Grid>
                        {user.username ? (
                            <>
                                <Grid item xs={3} md={1}>
                                    <Link
                                        to="/logout"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            sx={{
                                                color: "white",
                                                display: "block",
                                                fontSize: "20px",
                                                textTransform: "none",
                                            }}
                                            size="large"
                                        >
                                            Logout
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={3} md={1} alignItems="center">
                                    <Link
                                        to="/profile"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            sx={{
                                                color: "white",
                                                display: "block",
                                                fontSize: "20px",
                                                textTransform: "none",
                                            }}
                                            size="large"
                                        >
                                            {user.username}
                                        </Button>
                                    </Link>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={3} md={1}>
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            sx={{
                                                color: "white",
                                                display: "block",
                                                fontSize: "20px",
                                                textTransform: "none",
                                            }}
                                            size="large"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={3} md={1} alignItems="center">
                                    <Link
                                        to="/register"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            sx={{
                                                color: "white",
                                                display: "block",
                                                fontSize: "20px",
                                                textTransform: "none",
                                            }}
                                            size="large"
                                        >
                                            Register
                                        </Button>
                                    </Link>
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
