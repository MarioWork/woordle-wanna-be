import { useReducer } from "react";
import { LetterContainerType } from "../constants/letter-container-type";


const createDefaultGuessHistory = () => {
    let history = [];

    for (let i = 0; i < NUMBER_OF_TRIES; i++) {
        let historyGuess = [];

        for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
            historyGuess.push({ letter: "", containerType: LetterContainerType.DEFAULT });
        }
        history.push(historyGuess);
    }

    return history;
};

const initialState = {
    word: "HELLO",
    currentGuess: [],
    guessCount: 0,
    hasWon: false,
    isGameOver: false,
    guessHistory: createDefaultGuessHistory(),
}

const useWoordle2 = () => {


    const reducer = (state, { action, payload }) => {

    }



    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        x: 0
    }
};


