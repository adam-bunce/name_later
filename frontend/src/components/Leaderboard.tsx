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
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";

import ReplayIcon from "@mui/icons-material/Replay";

// update both past day and all time on refresh click/load then use toggle to toggle which one is seen

function Leaderboard() {
    interface leaderboard {
        score: number;
        accuracy: number;
        duration: number;
        User: { username: string };
    }

    interface leaderboardState {
        all: leaderboard[];
        pastDay: leaderboard[];
    }

    const [leaderboardData, setLeaderboardData] = useState<leaderboardState>();

    const [alignment, setAlignment] = useState<string>("all");

    const getLeaderBoardData = async (time: string) => {
        await axios
            .get(`http://localhost:8000/games/top`, {})
            .then((response) => {
                console.log(response.data);
                setLeaderboardData({
                    all: response.data.all,
                    pastDay: response.data.day,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        console.log(newAlignment);
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    useEffect(() => {
        getLeaderBoardData("all");
    }, []);

    return (
        <Grid container p={5} justifyContent={"center"}>
            <Grid item xs={10} md={6} lg={4}>
                <Typography variant="h4" align="center">
                    Leaderboard
                </Typography>
                <TableContainer
                    component={Paper}
                    elevation={1}
                    variant="outlined"
                >
                    <Table>
                        <TableHead>
                            <TableCell>Rank</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>WPM</TableCell>
                            <TableCell>Accuracy</TableCell>
                            <TableCell>Length (sec) </TableCell>
                        </TableHead>
                        <TableBody>
                            {leaderboardData ? (
                                <>
                                    {leaderboardData[
                                        alignment as keyof leaderboardState
                                    ].map(
                                        (
                                            game: leaderboard,
                                            index: number
                                        ): ReactElement => {
                                            let username: string = "";
                                            let userColor: string =
                                                "rgba(0, 0, 0, 0.87)"; // text.primary not workin?

                                            if (game.User) {
                                                username = game.User.username;
                                            } else {
                                                username = "Anon";
                                                userColor =
                                                    "rgba(0, 0, 0, 0.6)";
                                            }

                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            color: userColor,
                                                        }}
                                                    >
                                                        {username}
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.score}
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.accuracy}%
                                                    </TableCell>
                                                    <TableCell>
                                                        {game.duration}
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
                {/* TODO these buttons are too big and blocky on normal screens make them skinnier always (no word stacking unless mobile)*/}
                <Grid item container xs={12} md={12} lg={12} m={1}>
                    <Grid item xs={6} sm={7} justifyContent="center">
                        <Button
                            sx={{ height: "100%" }}
                            variant="contained"
                            endIcon={<ReplayIcon />}
                            onClick={() => {
                                setLeaderboardData(undefined);
                                getLeaderBoardData(alignment);
                            }}
                        >
                            Refresh
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <ToggleButtonGroup
                            exclusive
                            value={alignment}
                            onChange={handleAlignment}
                        >
                            <ToggleButton value="all">All Time</ToggleButton>
                            <ToggleButton value="pastDay">
                                24 Hours
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Leaderboard;
