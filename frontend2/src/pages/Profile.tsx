import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

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
        createdAt: Date; // Sequelize.DATE type??
    }

    const [userInfo, setUserInfo] = useState<userInfoState[]>([]); // i dont think this is optimal lol

    return (
        <>
            <Navbar />
            <h1>{user.username}</h1>
            <h4>Match History</h4>
            {user.userId ? null : <Navigate replace to="/login" />}
            <table>
                <tr>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
                {userInfo ? (
                    userInfo
                        .slice(0)
                        .reverse()
                        .map((game: userInfoState) => {
                            return (
                                <tr>
                                    <td>{game.score}</td>
                                    <td>{JSON.stringify(game.createdAt)}</td>
                                </tr>
                            );
                        })
                ) : (
                    <tr></tr>
                )}
            </table>
        </>
    );
}

export default Profile;
