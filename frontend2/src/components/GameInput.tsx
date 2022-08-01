import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    updateTextBoxValue,
    submitWord,
    resetState,
    addGameToDatabase,
    calculateAccuracy,
    calculateWPM,
} from "../features/game/gameSlice";
import CachedIcon from "@mui/icons-material/Cached";

function GameInput() {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.game);
    const user = useAppSelector((state) => state.user); // shouldnt need this b/c user id is on res.locals if it exists, add it to the creation path

    const [time, setTime] = useState(15);
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
            <TextField
                autoComplete="off"
                disabled={inputDisabled}
                value={game.textBoxValue}
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

            <span>
                <Button variant="contained" color="secondary">
                    {time}
                </Button>
            </span>
            <span>
                {/* reset/restart game button */}
                <Button
                    onClick={() => {
                        console.log(game.submittedPassage);
                        setTime(15);
                        setTimerRunning(false);
                        setInputDisabled(false);
                        dispatch(resetState());
                    }}
                    variant="contained"
                >
                    <CachedIcon />
                </Button>
            </span>
        </>
    );
}

export default GameInput;
