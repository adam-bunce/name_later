import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const randomWords = require("random-words");

interface gameState {
    wordsPerMinute: number | null;
    wordsCompleted: number;
    correctWords: number;
    textBoxValue: string;
    currentWord: string;
    currentWordIndex: number;
    passage: string[];
    passageBool: boolean[];
    timer: {
        isRunning: boolean;
        time: number;
    };
}

const initialState: gameState = {
    wordsPerMinute: 0,
    wordsCompleted: 0,
    correctWords: 0,
    textBoxValue: "",
    currentWord: "",
    currentWordIndex: 0,
    passage: [],
    passageBool: [],
    timer: {
        isRunning: false,
        time: 30,
    },
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        generatePassage(state) {
            state.passage = randomWords({ exactly: 100 });
            state.currentWord = state.passage[0];
        },
        calculateWPM(state) {
            // maybe need to add longer typing sessions 30 is good for now though
            state.wordsPerMinute = state.wordsCompleted * 30;
        },
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
                state.correctWords++;
                state.passageBool.push(true);
            } else {
                state.passageBool.push(false);
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
});

export const { calculateWPM, updateTextBoxValue, submitWord, generatePassage } =
    gameSlice.actions;
export default gameSlice.reducer;
