import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Profile() {
    useEffect(() => {
        const getUserInfo = async () => {
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/users/me`, {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.data.user) {
                        console.log("response from get me", response);
                        setUserInfo(response.data.user);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getUserInfo();
    }, []); // dispatch to store and check if user info exists, if it doesnt then redirect to login

    const [userInfo, setUserInfo] = useState();

    return (
        <>
            <Navbar />
            {userInfo ? <div> {JSON.stringify(userInfo)}</div> : <div></div>}
        </>
    );
}

export default Profile;
