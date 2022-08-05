import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    updateTextBoxValue,
    submitWord,
    resetState,
    addGameToDatabase,
    calculateAccuracy,
    calculateWPM,
    updateTime,
} from "../features/game/gameSlice";
import CachedIcon from "@mui/icons-material/Cached";

function GameInput() {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.game);
    const user = useAppSelector((state) => state.user); // shouldnt need this b/c user id is on res.locals if it exists, add it to the creation path

    const [time, setTime] = useState(game.testSeconds);
    const [timerRunning, setTimerRunning] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

    // i feel like this is kinda jank
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1);
            // console.log(time);
        }, 1000);

        if (!timerRunning) {
            clearInterval(interval);
        }

        if (time <= 0) {
            // if forntend is saved then this will spam dispatch before waiting for next round
            // but accuracy is null (everything gets reset after timer hits zero) so the seqeulize creation fails
            console.log(game.submittedPassage);
            console.log(game.targetPassage);

            dispatch(calculateAccuracy());
            dispatch(calculateWPM());

            dispatch(addGameToDatabase());

            setInputDisabled(true);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [time, timerRunning]);

    return (
        <>
            <Grid item xs={8}>
                <TextField
                    autoComplete="off"
                    disabled={inputDisabled}
                    value={game.textBoxValue}
                    sx={{ height: "100%", width: "100%" }}
                    onChange={(event) => {
                        setTimerRunning(true);
                        dispatch(updateTextBoxValue(event.target.value));
                    }}
                    // don't use keydown, leaves lingering space
                    onKeyUp={(event) => {
                        if (event.code === "Space") {
                            dispatch(submitWord());
                        }
                    }}
                />
            </Grid>

            <Grid item xs={2}>
                {timerRunning ? (
                    <Button
                        variant="contained"
                        color={time <= 0 ? "error" : "success"}
                        sx={{ height: "100%", width: "100%" }}
                    >
                        {time}
                    </Button>
                ) : (
                    <Select
                        value={game.testSeconds}
                        onChange={(event) => {
                            dispatch(
                                updateTime(Number(event.target.value) || 60)
                            );
                            setTime(Number(event.target.value) || 60);
                        }}
                        sx={{ height: "100%", width: "100%" }}
                    >
                        <MenuItem value={15}> 15</MenuItem>
                        <MenuItem value={30}> 30</MenuItem>
                        <MenuItem value={60}> 60</MenuItem>
                    </Select>
                )}
            </Grid>

            <Grid item xs={2}>
                {/* reset/restart game button */}
                <Button
                    onClick={() => {
                        console.log(game.submittedPassage);
                        setTime(game.testSeconds);
                        setTimerRunning(false);
                        setInputDisabled(false);
                        dispatch(resetState());
                    }}
                    variant="contained"
                    sx={{ width: "100%", height: "100%" }}
                >
                    <CachedIcon />
                </Button>
            </Grid>
        </>
    );
}

export default GameInput;
