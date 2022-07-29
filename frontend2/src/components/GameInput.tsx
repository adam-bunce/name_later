import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    updateTextBoxValue,
    submitWord,
    resetState,
    calculateWPM,
    generatePassage,
    addGameToDatabase,
} from "../features/game/gameSlice";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";

function GameInput() {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.game);
    const user = useAppSelector((state) => state.user);

    const [time, setTime] = useState(5);
    const [timerRunning, setTimerRunning] = useState(false);

    // i feel like this is kinda jank
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1);
            console.log(time);
        }, 1000);

        if (!timerRunning) {
            clearInterval(interval);
        }

        if (time <= 0) {
            // dispach update wpm
            // dispatch(calculateWPM());
            dispatch(addGameToDatabase(user.userId));
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
                        setTime(5);
                        setTimerRunning(false);
                        dispatch(resetState());
                        dispatch(generatePassage());
                    }}
                    variant="contained"
                >
                    <CachedIcon />
                </Button>
            </span>

            <div>WPM: {game.wordsPerMinute}</div>
            <div>
                accuracy:{" "}
                {game.accuracy ? Math.round(game.accuracy * 100) : "play"}%
            </div>
        </>
    );
}

export default GameInput;
