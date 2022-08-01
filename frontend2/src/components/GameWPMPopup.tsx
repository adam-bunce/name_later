import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";

function GameWPMPopup() {
    const game = useAppSelector((state) => state.game);

    useEffect(() => {}, [game.wordsPerMinute]);

    return game.wordsPerMinute ? (
        <>
            <div> {game.wordsPerMinute} </div>
            <div> {game.accuracy} </div>
        </>
    ) : (
        <>
            <div> no wpm {game.accuracy} </div>
            <div> no acc</div>
        </>
    );
}

export default GameWPMPopup;
