import { Grid } from "@mui/material";
import React from "react";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import TempGame from "../components/TempGame";

function Home() {
    return (
        <>
            <Navbar />
            <Game />

            <Leaderboard />
        </>
    );
}

export default Home;
