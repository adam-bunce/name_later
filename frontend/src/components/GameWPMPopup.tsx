import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import KeyboardIcon from "@mui/icons-material/Keyboard";
function GameWPMPopup() {
    const game = useAppSelector((state) => state.game);

    useEffect(() => {}, [game.wordsPerMinute]);

    return game.wordsPerMinute || game.wordsPerMinute === 0 ? (
        <Card>
            <CardContent>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    Results{"\u00A0"}
                    <KeyboardIcon />
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {game.testSeconds} second test
                </Typography>

                <Typography>
                    WPM:
                    <Typography color="text.secondary" display={"inline"}>
                        {" " + game.wordsPerMinute + " "}
                    </Typography>
                    {"\u00A0"}
                    {"\u00A0"}Accuracy:
                    <Typography color="text.secondary" display={"inline"}>
                        {" " + game.accuracy + "%"}
                    </Typography>
                </Typography>
            </CardContent>
        </Card>
    ) : (
        <></>
    );
}

export default GameWPMPopup;
