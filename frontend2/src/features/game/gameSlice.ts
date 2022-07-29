import { ConstructionOutlined } from "@mui/icons-material";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
const wordsJSON = require("../../static/words.json");

interface gameState {
    wordsPerMinute: number | null;
    wordsCompleted: number;
    accuracy: number | null;
    correctCharacters: number;
    incorrectCharacters: number;
    spaces: number;
    textBoxValue: string;
    currentWord: string;
    currentWordIndex: number;
    passage: string[];
    passageBool: boolean[];
}

const initialState: gameState = {
    wordsPerMinute: 0,
    wordsCompleted: 0,
    accuracy: null,
    correctCharacters: 0,
    incorrectCharacters: 0,
    spaces: 0,
    textBoxValue: "",
    currentWord: "",
    currentWordIndex: 0,
    passage: [],
    passageBool: [],
};

function generateWords(number: number): string[] {
    let count: number = 0;
    let words: string[] = [];

    while (count < number) {
        count++;
        words.push(wordsJSON.words[Math.floor(Math.random() * 201)]);
    }

    return words;
}

export const addGameToDatabase = createAsyncThunk<
    any,
    any,
    { state: RootState }
>("game/createGame", async (userId: number | null, ThunkAPI) => {
    const state: RootState = ThunkAPI.getState();

    let wordsPerMinute =
        ((state.game.correctCharacters + state.game.spaces) / 5) * 12; // for 30 sec

    let accuracy =
        state.game.correctCharacters /
        (state.game.correctCharacters + state.game.incorrectCharacters);

    try {
        const response = await axios.post("http://localhost:8000/games", {
            userId: userId,
            score: wordsPerMinute,
        });
        console.log("create game", response);
        return response;
    } catch (err: any) {
        // need to protect this route somehow

        console.log("create game", err);
        return ThunkAPI.rejectWithValue(err);
    }
});

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        resetState(state) {
            state.wordsCompleted = 0;
            state.correctCharacters = 0;
            state.textBoxValue = "";
            state.currentWord = "";
            state.currentWordIndex = 0;
            state.passage = [];
            state.passageBool = [];
        },
        generatePassage(state) {
            state.passage = generateWords(200);
            state.currentWord = state.passage[0];
        },
        calculateWPM(state) {
            // maybe need to add longer typing sessions 30 is good for now though
            console.log(state.correctCharacters + " / 5 * 2");
            // state.wordsPerMinute = (state.correctCharacters / 5) * 12; // for testing w/ 5 sec instead of 30

            console.log("correct char ", state.correctCharacters);
            console.log("incorrect char ", state.incorrectCharacters);
            console.log("spaces: ", state.spaces);
            state.wordsPerMinute =
                ((state.correctCharacters + state.spaces) / 5) * 12; // for 30 sec

            state.accuracy =
                state.correctCharacters /
                (state.correctCharacters + state.incorrectCharacters);
        },
        gameCompleted() {},
        updateTextBoxValue(state, action: PayloadAction<string>) {
            state.textBoxValue = action.payload;
        },
        submitWord(state) {
            // the way 10fastfingers handles submission seems pretty similar
            state.wordsCompleted++;

            console.log(state.textBoxValue.split(" ")[0]);

            const word = state.textBoxValue.split(" ");
            console.log("word array", word);

            if (
                // handling word(space)nextword error by splitting
                state.textBoxValue.split(" ")[0] ===
                state.passage[state.currentWordIndex]
            ) {
                state.spaces++;
                state.correctCharacters += word[0].length;
                state.passageBool.push(true);
            } else {
                state.passageBool.push(false);
                state.incorrectCharacters += word[0].length;
            }

            // after submission if the index is 9 then pop the firs 9 off so it will hop down a block

            state.currentWordIndex += 1;
            state.currentWord = state.passage[state.currentWordIndex];
            console.log(state.passage.slice(0, 10));
            console.log(state.passageBool.slice(0, 10));

            // completed current line
            if (state.currentWordIndex > 9) {
                state.passage.splice(0, 10);
                state.passageBool.splice(0, 10);
                state.currentWordIndex = 0;
            }
            state.textBoxValue = "" || word[1];
        },
        updateCurrentWord(state, action: PayloadAction<string>) {
            state.currentWord = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addGameToDatabase.pending, (state) => {
                console.log("pending");
            })
            .addCase(
                addGameToDatabase.rejected,
                (state, action: PayloadAction<any>) => {
                    console.log("rejected");
                    console.log(action);
                }
            )
            .addCase(addGameToDatabase.fulfilled, (state) => {
                console.log("fufilled");
            });
    },
});

export const {
    resetState,
    calculateWPM,
    updateTextBoxValue,
    submitWord,
    generatePassage,
} = gameSlice.actions;
export default gameSlice.reducer;
