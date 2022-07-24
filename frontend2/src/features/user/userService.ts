import axios from "axios";

interface loginInfo {
    username: string;
    password: string;
}

const login = async (userInfo: loginInfo): Promise<any> => {
    const { username, password } = userInfo;

    console.log("something something something");
    let returnValue = null;

    await axios
        .post(
            "http://localhost:8000/users/login",
            { username: username, password: password },
            { withCredentials: true }
        )
        .then((response) => {
            console.log("response", response);
            returnValue = response;
        })
        .catch((err) => {
            console.log("err", err);
            returnValue = err;
        });

    // difficutl to return nformation from thencatch statements
    return returnValue;
};

export default login;
