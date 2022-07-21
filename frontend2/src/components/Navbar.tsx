import React from "react";
import {
    AppBar,
    Box,
    Grid,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

// TODO need to conditionally render username and logout/login options

function Navbar() {
    return (
        <AppBar>
            <Toolbar>
                <Grid container direction="row" alignItems={"center"}>
                    <Grid item xs={10}>
                        <Typography variant="h4">
                            <Link underline="none" color="#FFFFFF" href="/">
                                Home
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <Typography variant="h6">
                            <Link
                                underline="none"
                                color="#FFFFFF"
                                href="/logout"
                            >
                                Logout
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={1} alignItems="center">
                        <Typography variant="h6">
                            <Link underline="none" color="#FFFFFF" href="/me">
                                Profile
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
