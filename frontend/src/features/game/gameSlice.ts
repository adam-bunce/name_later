import {
    ConstructionOutlined,
    Satellite,
    SatelliteAlt,
} from "@mui/icons-material";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
const wordsJSON = require("../../static/words.json");

interface gameState {
    textBoxValue: string;
    currentWordIndex: number;
    targetPassage: string[];
    submittedPassage: string[];
    livePassageBool: boolean[];
    wordsPerMinute: number | null;
    accuracy: number | null;
    testSeconds: number;
}

const initialState: gameState = {
    textBoxValue: "",
    currentWordIndex: 0,
    targetPassage: generateWords(200),
    submittedPassage: [], // .push(submission.split(''))
    livePassageBool: [],
    wordsPerMinute: null,
    accuracy: null,
    testSeconds: 15,
};

function generateWords(number: number): string[] {
    let count: number = 0;
    let words: string[] = [];

    while (count < number) {
        count++;
        words.push(wordsJSON.words[Math.floor(Math.random() * 200)]);
    }

    return words;
}

export const addGameToDatabase = createAsyncThunk<
    any,
    void,
    { state: RootState }
>("game/createGame", async (_arg: void, ThunkAPI) => {
    const state: RootState = ThunkAPI.getState();
    const accuracy = state.game.accuracy;
    const score = state.game.wordsPerMinute;
    const duration = state.game.testSeconds;

    try {
        const response = await axios.post(
            "http://localhost:8000/games",
            {
                score,
                accuracy,
                duration,
            },
            { withCredentials: true }
        );
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
            state.textBoxValue = "";
            state.currentWordIndex = 0;
            state.targetPassage = generateWords(200);
            state.submittedPassage = [];
            state.livePassageBool = [];
            state.wordsPerMinute = null;
            state.accuracy = null;
        },
        updateTextBoxValue(state, action: PayloadAction<string>) {
            state.textBoxValue = action.payload;
        },
        updateTime(state, action: PayloadAction<number>) {
            state.testSeconds = action.payload;
        },
        submitWord(state) {
            const submittedWords = state.textBoxValue.split(" ");
            const targetWord = state.targetPassage[state.currentWordIndex];

            console.log(`"${submittedWords[0]}" vs "${targetWord}"`);

            if (submittedWords[0] === targetWord) {
                state.livePassageBool.push(true);
            } else {
                state.livePassageBool.push(false);
            }

            if (state.livePassageBool.length >= 10) {
                state.livePassageBool = [];
            }

            state.submittedPassage.push(submittedWords[0]);

            state.textBoxValue = submittedWords[1] || "";
            state.currentWordIndex++;
        },
        calculateWPM(state) {
            let correctWordChars = 0;

            for (let i = 0; i < state.submittedPassage.length; i++) {
                if (state.submittedPassage[i] === state.targetPassage[i]) {
                    // word is correct
                    // +1 for space
                    correctWordChars += state.submittedPassage[i].length;
                    correctWordChars += 1;
                }
            }

            state.wordsPerMinute = Math.round(
                (correctWordChars * (60 / state.testSeconds)) / 5
            );
        },
        calculateAccuracy(state) {
            let correctChar = 0;
            let incorrectChar = 0;

            for (let i = 0; i < state.submittedPassage.length; i++) {
                if (state.submittedPassage[i] === state.targetPassage[i]) {
                    correctChar += state.submittedPassage[i].length;
                    correctChar += 1;
                    continue;
                } else {
                    // check if any of the characters in the word were correct
                    for (let j = 0; j < state.submittedPassage[i].length; j++) {
                        if (
                            state.submittedPassage[i][j] ===
                            state.targetPassage[i][j]
                        ) {
                            correctChar++;
                        } else {
                            incorrectChar++;
                        }
                    }
                    incorrectChar++;
                }
            }

            state.accuracy = Math.round(
                (correctChar / (correctChar + incorrectChar)) * 100
            );
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
    updateTextBoxValue,
    updateTime,
    submitWord,
    calculateWPM,
    calculateAccuracy,
} = gameSlice.actions;
export default gameSlice.reducer;
