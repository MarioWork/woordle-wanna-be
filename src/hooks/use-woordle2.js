import { useReducer } from "react";
import { LetterContainerType } from "../constants/letter-container-type";

const NUMBER_OF_LETTERS = 5;
const NUMBER_OF_TRIES = 6;

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

const Actions = {
    ADD_LETTER: "add-letter",
    REMOVE_LETTER: "remove-letter",
    SUBMIT_GUESS: "submit-guess"
}

const useWoordle2 = () => {

    const addLetterCurrentGuess = (state, letter) => {
        const { currentGuess } = state;
        const upperCaseLetter = letter.toUpperCase();

        //Alternate last letter to the new one
        if (currentGuess.length >= NUMBER_OF_LETTERS) {
            currentGuess[NUMBER_OF_LETTERS - 1] = {
                letter: upperCaseLetter,
                containerType: LetterContainerType.DEFAULT
            };

            return { ...state, currentGuess: currentGuess };
        }

        return {
            ...state,
            currentGuess:
                [
                    ...currentGuess,
                    {
                        letter: upperCaseLetter,
                        containerType: LetterContainerType.DEFAULT
                    }
                ]
        }
    }

    const removeLastLetterCurrentGuess = (state) => {
        const { currentGuess } = state;
        return {
            ...state,
            currentGuess:
                [
                    ...currentGuess.slice(0, currentGuess.length - 1)
                ]
        };
    }

    const verifyGuess = (state) => {
        const { guessHistory, guessCount, } = state;
        const guessHistoryCopy = { ...guessHistory };

        guessHistoryCopy[guessCount] =
            guessHistory[guessCount]
                .map(guess => ({
                    ...guess,
                    containerType: LetterContainerType.RIGHT_SPOT
                }));

        return { ...state, guessHistory: guessHistoryCopy };
    }

    const submitGuess = (state) => {

        if (state.currentGuess.length !== NUMBER_OF_LETTERS) return state;

        let stateCopy = { ...state };

        if (stateCopy.guessCount + 1 >= NUMBER_OF_TRIES)
            stateCopy.isGameOver = true;

        //verify guess
        const verifiedState = verifyGuess(stateCopy);

        return { ...verifiedState, currentGuess: [], guessCount: verifiedState.guessCount + 1 };
    }

    const addHistory = (state) => {
        const { currentGuess, guessHistory, guessCount } = state;

        const arrayOfMissingGuessLetters =
            Array(NUMBER_OF_LETTERS - currentGuess.length)
                .fill({
                    letter: "",
                    containerType: LetterContainerType.DEFAULT
                });

        guessHistory[guessCount] =
            [
                ...currentGuess,
                ...arrayOfMissingGuessLetters
            ];

        return { ...state, guessHistory: guessHistory }
    }

    const reducer = (state, { action, payload }) => {

        if (state.guessCount >= NUMBER_OF_TRIES) return state;

        switch (action) {
            case Actions.ADD_LETTER:
                const updatedState = addLetterCurrentGuess(state, payload);
                return addHistory(updatedState);
            case Actions.REMOVE_LETTER:
                const updatedState2 = removeLastLetterCurrentGuess(state);
                return addHistory(updatedState2);
            case Actions.SUBMIT_GUESS:
                return submitGuess(state);
        }
    }


    const [{ guessHistory, hasWon, isGameOver }, dispatch] = useReducer(reducer, initialState);


    return {
        guessHistory,
        hasWon,
        isGameOver,
        addLetterToCurrentGuess: (letter) =>
            dispatch({ action: Actions.ADD_LETTER, payload: letter }),
        removeLastLetterOfCurrentGuess: () =>
            dispatch({ action: Actions.REMOVE_LETTER }),
        submitGuess: () =>
            dispatch({ action: Actions.SUBMIT_GUESS }),
    }
};

export default useWoordle2;

