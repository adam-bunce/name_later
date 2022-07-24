import React, { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../app/hooks";

function Game() {
    const [gameScore, setGameScore] = useState("");

    // make this functin be part of the redux feature
    const user = useAppSelector((state) => state.user);

    const addGameToDatabase = async () => {
        await axios.post("http://localhost:8000/games", {
            userId: user.userId,
            score: gameScore,
        });
        // need to protect this route somehow
    };

    return (
        <div>
            <h1>Game</h1>
            {user.username}
            <div>
                <input
                    type="text"
                    onChange={(event) => setGameScore(event.target.value)}
                />
                <button onClick={addGameToDatabase}>Add Game</button>
            </div>
        </div>
    );
}

export default Game;
