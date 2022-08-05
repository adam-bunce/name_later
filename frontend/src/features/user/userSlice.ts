// create slice defines reducer logic, paylaod action describes the content of an action
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import userService from "./userService";

export const loginUser = createAsyncThunk(
    "user/login",
    async (user: any, { rejectWithValue }) => {
        try {
            const response = await userService.login(user);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (userInfo: any, { rejectWithValue }) => {
        try {
            const response = await userService.register(userInfo);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    }
);

interface errorMessages {
    username: string;
    password: string;
    other: string;
}

interface UserState {
    username: string;
    userId: number | null;
    message: errorMessages;
}

const initialState: UserState = {
    username: "",
    userId: null,
    message: { username: "", password: "", other: "" },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // used in useEffect hook after hitting /me endpoint with jwt that may or may not exist
        logInUser(state, action: PayloadAction<any>) {
            state.username = action.payload.username; // immer allows for mutations (doesnt mutate under the hood)
            state.userId = action.payload.id;
            state.message = { username: "", password: "", other: "" };
        },
        logOutUser(state) {
            state.username = "";
            state.userId = null;
            state.message = { username: "", password: "", other: "" };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.username = "";
            state.userId = null;
            state.message = { username: "", password: "", other: "" };
        });
        builder.addCase(
            loginUser.rejected,
            (state, action: PayloadAction<any>) => {
                state.username = "";
                state.userId = null;
                state.message = {
                    username: action.payload.response.data.username,
                    password: action.payload.response.data.password,
                    other: action.payload.response.data.other,
                };
            }
        );
        builder.addCase(
            loginUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.username = action.payload.username;
                state.userId = action.payload.id;
                state.message = { username: "", password: "", other: "" };
            }
        );
        builder.addCase(registerUser.pending, (state) => {
            state.username = "";
            state.userId = null;
            state.message = { username: "", password: "", other: "" };
        });
        builder.addCase(
            registerUser.rejected,
            (state, action: PayloadAction<any>) => {
                state.username = "";
                state.userId = null;
                state.message = {
                    username: action.payload.response.data.username,
                    password: action.payload.response.data.password,
                    other: action.payload.response.data.other,
                };
            }
        );
        builder.addCase(
            registerUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.username = action.payload.username;
                state.userId = action.payload.userId;
                state.message = { username: "", password: "", other: "" };
            }
        );
    },
});

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
