import React from "react";
import GameInput from "./GameInput";
import GameTextPassage from "./GameTextPassage";
import GameWPMPopup from "./GameWPMPopup";

function Game() {
    return (
        <>
            <GameTextPassage />
            <GameInput />
            <GameWPMPopup />
        </>
    );
}

export default Game;
