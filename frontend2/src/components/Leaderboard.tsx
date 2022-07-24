import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, dividerClasses } from "@mui/material";

function Leaderboard() {
    interface leaderboardState {
        score: number;
        User: { username: string };
    }

    const [leaderboardData, setLeaderboardData] =
        useState<Array<leaderboardState>>();

    useEffect(() => {
        const getLeaderBoardData = async () => {
            await axios
                .get("http://localhost:8000/games", {}) // need to edit this controller to do a table join for username
                .then((response) => {
                    console.log(response.data);
                    setLeaderboardData(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getLeaderBoardData();
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            {leaderboardData ? (
                <>
                    <table>
                        <tr>
                            <th>Score</th>
                            <th>User</th>
                        </tr>
                        {leaderboardData.map(
                            (game: leaderboardState): ReactElement => {
                                let username = "";

                                game.User
                                    ? (username = game.User.username)
                                    : (username = "Anon");

                                return (
                                    <tr>
                                        <td>{game.score}</td>
                                        <td>{username}</td>
                                    </tr>
                                );
                            }
                        )}
                    </table>
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export default Leaderboard;
