import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { generatePassage } from "../features/game/gameSlice";

function GameTextPassage() {
    const game = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(generatePassage());
    }, []);

    function stringsMatch(
        textBoxString: string,
        passageString: string
    ): boolean {
        textBoxString = textBoxString.split(" ")[0]; //only care about stuff before space

        if (
            passageString !== undefined &&
            textBoxString.length > passageString.length
        ) {
            console.log(textBoxString.length > passageString.length);
            return false;
        }

        // they are the same length or the textbox string is shorter now
        const passageStringArray = passageString.split("");
        const textBoxStringArray = textBoxString.split("");

        console.log(passageStringArray);
        console.log(textBoxStringArray);

        for (var i = 0; i < textBoxStringArray.length; i++) {
            console.log(passageStringArray[i], textBoxStringArray[i]);
            if (passageStringArray[i] === textBoxStringArray[i]) {
                continue;
            } else {
                console.log("returning false");
                return false;
            }
        }

        return true;
    }

    return (
        <>
            <div>
                {game.passage.slice(0, 10).map((word, index) => {
                    if (index == game.currentWordIndex) {
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
                                </span>{" "}
                                <span></span>{" "}
                            </>
                        );
                    } else {
                        if (index <= game.passageBool.length) {
                            return (
                                <span
                                    style={{
                                        color: game.passageBool[index]
                                            ? "green"
                                            : "red",
                                    }}
                                >
                                    {" "}
                                    {word + " "}
                                </span>
                            );
                        } else {
                            return <span>{word + " "}</span>;
                        }
                    }
                })}
                <br></br>
                {game.passage.slice(10, 20).map((word) => {
                    return <span> {word + " "} </span>;
                })}
            </div>
        </>
    );
}

export default GameTextPassage;
