import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";

import Chart from "../components/Chart";
import MatchHistory from "../components/MatchHistory";

function Profile() {
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        const getUserInfo = async () => {
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
                        setUserInfo(response.data);
                    }
                })
                .catch((err) => {
                    setUserInfo(err.response.data);
                    console.log(err);
                });
        };

        getUserInfo();
    }, [user.userId]); // dispatch to store and check if user info exists, if it doesnt then redirect to login

    interface userInfoState {
        score: number;
        accuracy: number;
        duration: number;
        createdAt: Date; // Sequelize.DATE type??
    }

    const [userInfo, setUserInfo] = useState<userInfoState[]>([]); // i dont think this is optimal lol

    return (
        <>
            <Navbar />
            <Typography variant="h4" color="primary" align="center">
                {user.username}
            </Typography>
            {user.userId ? null : <Navigate replace to="/login" />}
            {/** graph goes here */}
            <MatchHistory />
        </>
    );
}

export default Profile;
