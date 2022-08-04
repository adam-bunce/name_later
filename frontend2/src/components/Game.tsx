import { Box, Grid } from "@mui/material";
import React from "react";
import GameInput from "./GameInput";
import GameTextPassage from "./GameTextPassage";
import GameWPMPopup from "./GameWPMPopup";

function Game() {
    return (
        // length of text changes on each refresh which moves stuff around kinda annoying
        <Grid container mt={5} direction="column" alignItems="center">
            <Grid container direction="row" justifyContent={"center"}>
                <Grid
                    container
                    item
                    justifyContent="center"
                    alignItems={"center"}
                    xs={12}
                    md={8}
                >
                    <GameTextPassage />
                    <Grid container item justifyContent={"center"}>
                        <Grid container item m={2} sm={8} lg={6}>
                            <GameInput />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <GameWPMPopup />
        </Grid>
    );
}

export default Game;
