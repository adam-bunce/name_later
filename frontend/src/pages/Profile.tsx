import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

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
                        setUserInfo(response.data);
                    }
                })
                .catch((err) => {
                    setUserInfo(err.response.data);
                });
        };

        getUserInfo();
    }, [user.userId]); // dispatch to store and check if user info exists, if it doesnt then redirect to login

    interface userInfoState {
        score: number;
        accuracy: number;
        duration: number;
        createdAt: string; // Sequelize.DATE type??
    }

    const [userInfo, setUserInfo] = useState<userInfoState[]>([]);

    return (
        <>
            <Navbar />
            <Typography variant="h4" color="primary" align="center" pt={5}>
                Words Per Minute
            </Typography>
            <Chart data={userInfo} />
            {user.userId ? null : <Navigate replace to="/login" />}
            <MatchHistory />
        </>
    );
}

export default Profile;
