import React from "react";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateTextBoxValue, submitWord } from "../features/game/gameSlice";

function GameInput() {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.game);

    return (
        <>
            <TextField
                autoComplete="off"
                value={game.textBoxValue}
                onChange={(event) => {
                    dispatch(updateTextBoxValue(event.target.value));
                }}
                // don't use keydown, leaves lingering space
                onKeyUp={(event) => {
                    if (event.code === "Space") {
                        dispatch(submitWord());
                    }
                }}
            />

            <div>total: {game.wordsCompleted}</div>
            <div>correct: {game.correctWords}</div>
        </>
    );
}

export default GameInput;
