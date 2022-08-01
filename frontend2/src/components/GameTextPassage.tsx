import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function GameTextPassage() {
    const game = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();
    function stringsMatch(
        textBoxString: string,
        passageString: string
    ): boolean {
        textBoxString = textBoxString.split(" ")[0];
        if (
            passageString !== undefined &&
            textBoxString.length > passageString.length
        ) {
            console.log(textBoxString.length > passageString.length);
            return false;
        }

        if (passageString === undefined || textBoxString === undefined) {
            return false;
        }

        const passageStringArray = passageString.split("");
        const textBoxStringArray = textBoxString.split("");

        for (var i = 0; i < textBoxStringArray.length; i++) {
            if (passageStringArray[i] === textBoxStringArray[i]) {
                continue;
            } else {
                console.log("returning false");
                return false;
            }
        }

        return true;
    }

    // starterIndex = Math.floor(game.currentWordIndex / 10);

    function generateCurrentSection() {
        const passageStartIndex: number =
            Math.floor(game.currentWordIndex / 10) * 10;
        const currentIndex: number = game.currentWordIndex % 10;

        const currentlyTypingWords: string[] = game.targetPassage.slice(
            passageStartIndex,
            passageStartIndex + 10
        ); // 10 words

        const currentlyTypingJSX = currentlyTypingWords.map((word, index) => {
            if (index == currentIndex) {
                return (
                    <>
                        <span
                            style={{
                                borderRadius: "3px",
                                background: stringsMatch(
                                    game.textBoxValue,
                                    word
                                )
                                    ? "rgb(221, 221, 221)"
                                    : "red",
                            }}
                        >
                            {word}
                        </span>
                        <span> </span>
                    </>
                );
            } else {
                if (index < currentIndex) {
                    return (
                        <span
                            style={{
                                color: game.livePassageBool[index]
                                    ? "green"
                                    : "red",
                            }}
                        >
                            {word + " "}
                        </span>
                    );
                } else {
                    return <span>{word + " "}</span>;
                }
            }
        });

        return currentlyTypingJSX;
    }

    function generateNextSection() {
        const passageStartIndex: number =
            Math.floor(game.currentWordIndex / 10) * 10;

        const typingNext: string[] = game.targetPassage.slice(
            passageStartIndex + 10,
            passageStartIndex + 20
        ); // 10 words

        const typingNextJSX = typingNext.map((word) => {
            return <span> {word + " "}</span>;
        });

        return typingNextJSX;
    }

    return (
        <div>
            {generateCurrentSection()}
            <br></br>
            {generateNextSection()}
        </div>
    );
}

export default GameTextPassage;
