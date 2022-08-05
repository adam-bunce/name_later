import axios from "axios";

interface loginInfo {
    username: string;
    password: string;
}

const login = async (userInfo: loginInfo): Promise<any> => {
    const { username, password } = userInfo;

    return await axios.post(
        "http://localhost:8000/users/login",
        { username: username, password: password },
        { withCredentials: true }
    );
};

const register = async (userInfo: loginInfo): Promise<any> => {
    const { username, password } = userInfo;

    return await axios.post(
        "http://localhost:8000/users/register",
        { username: username, password: password },
        { withCredentials: true }
    );
};

const userService = {
    login,
    register,
};

export default userService;
