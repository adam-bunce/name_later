import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Chart from "../components/Chart";

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
        createdAt: Date; // Sequelize.DATE type??
    }

    const [userInfo, setUserInfo] = useState<userInfoState[]>([]); // i dont think this is optimal lol

    return (
        <>
            <Navbar />
            <h1>{user.username}</h1>
            <h4>Match History</h4>
            {user.userId ? null : <Navigate replace to="/login" />}

            {userInfo ? (
                <Chart data={userInfo} />
            ) : (
                <div>
                    <Skeleton />
                </div>
            )}

            <table>
                <tr>
                    <th>Score</th>
                    <th>accuracy</th>
                    <th>Date</th>
                </tr>
                {userInfo
                    ? userInfo
                          .slice(0)
                          .reverse()
                          .map((game: userInfoState) => {
                              return (
                                  <tbody>
                                      <td>{game.score}</td>
                                      <td>{game.accuracy}%</td>
                                      <td>{JSON.stringify(game.createdAt)}</td>
                                  </tbody>
                              );
                          })
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                          return (
                              <tbody>
                                  <td>
                                      <Skeleton />
                                  </td>
                                  <td>
                                      <Skeleton />
                                  </td>
                                  <td>
                                      <Skeleton />
                                  </td>
                              </tbody>
                          );
                      })}
            </table>
        </>
    );
}

export default Profile;
function ctx(
    ctx: any,
    arg1: {
        type: string;
        data: any;
        options: { scales: { y: { stacked: boolean } } };
    }
): React.ReactNode {
    throw new Error("Function not implemented.");
}
