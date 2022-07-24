// create slice defines reducer logic, paylaod action describes the content of an action
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const login = require("./userService");
import login from "./userService";

// this one is usd in login componenet
export const loginUser = createAsyncThunk(
    "user/login",
    // need to specify types here or no worky
    async (user: any, thunkAPI): Promise<any> => {
        console.log("login user function running");
        try {
            const response = await login(user);
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

interface UserState {
    username: string;
    userId: number | null;
    loggedIn: boolean;
}

const initialState: UserState = {
    username: "",
    userId: null,
    loggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState, // could use object shorthand
    reducers: {
        // used in useEffect hook
        logInUser(state, action: PayloadAction<any>) {
            state.username = action.payload.username; // immer allows for mutations (doesnt mutate under the hood)
            state.userId = action.payload.id;
            state.loggedIn = true;
        },
        logOutUser(state) {
            state.username = "";
            state.userId = null;
            state.loggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {});
        builder.addCase(loginUser.rejected, (state) => {});
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.userId = action.payload.id;
            state.loggedIn = true;
        });
    },
});

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
