import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    Grid,
    TableRow,
    Typography,
    Button,
    Paper,
    Skeleton,
} from "@mui/material";

import ReplayIcon from "@mui/icons-material/Replay";
import { useAppSelector } from "../app/hooks";

function MatchHistory() {
    const user = useAppSelector((state) => state.user);

    interface matchHistoryState {
        score: number;
        accuracy: number;
        duration: number;
        createdAt: string;
    }

    const [matchHistory, setMatchHistory] =
        useState<Array<matchHistoryState>>();

    const getMatchHistory = async () => {
        if (user.userId === null) {
            return;
        }

        await axios
            .get(`http://localhost:8000/games/${user.userId}`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response) {
                    // console.log("response from get me", response);
                    console.log(
                        "type of created at",
                        typeof response.data.createdAt
                    );
                    console.log(response);
                    setMatchHistory(response.data);
                }
            })
            .catch((err) => {
                // setUserInfo(err.response.data);
                console.log(err);
            });
    };

    useEffect(() => {
        getMatchHistory();
    }, []);

    return (
        <Grid container p={5} justifyContent={"center"}>
            <Grid item xs={10} md={6} lg={4}>
                <Typography variant="h4" align="center">
                    Match History
                </Typography>
                <TableContainer
                    component={Paper}
                    elevation={1}
                    variant="outlined"
                >
                    <Table>
                        <TableHead>
                            <TableCell>WPM</TableCell>
                            <TableCell>Accuracy</TableCell>
                            <TableCell>Length (sec) </TableCell>
                            <TableCell>Date </TableCell>
                        </TableHead>
                        <TableBody>
                            {matchHistory ? (
                                <>
                                    {matchHistory
                                        .slice()
                                        .reverse()
                                        .map(
                                            (
                                                game: matchHistoryState
                                            ): ReactElement => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            {game.score}
                                                        </TableCell>
                                                        <TableCell>
                                                            {game.accuracy}%
                                                        </TableCell>
                                                        <TableCell>
                                                            {game.duration}
                                                        </TableCell>
                                                        <TableCell>
                                                            {game.createdAt}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        )}
                                </>
                            ) : (
                                <>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (): ReactElement => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton></Skeleton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default MatchHistory;
