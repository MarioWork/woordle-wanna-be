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
    word: "CARDS",
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

const useWoordle = () => {

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
        const { guessHistory, guessCount, word } = state;
        const guessHistoryCopy = [...guessHistory];
        const wordArray = word.toUpperCase().split("");

        let rightSpotLetterCounter = 0;
        guessHistoryCopy[guessCount] =
            guessHistory[guessCount]
                .map((guess, index) => {

                    if (wordArray[index] === guess.letter) {
                        rightSpotLetterCounter++;
                        return { ...guess, containerType: LetterContainerType.RIGHT_SPOT };
                    }

                    if (wordArray.includes(guess.letter)) {
                        return { ...guess, containerType: LetterContainerType.WRONG_SPOT };
                    }

                    return { ...guess, containerType: LetterContainerType.NON_EXISTENT };

                });

        const hasWon = rightSpotLetterCounter == wordArray.length;

        return {
            ...state,
            guessHistory: guessHistoryCopy,
            hasWon: hasWon,
            isGameOver: hasWon
        };
    }

    const submitGuess = (state) => {

        if (state.currentGuess.length !== NUMBER_OF_LETTERS) return state;

        const stateCopy = { ...state };

        if (stateCopy.guessCount + 1 >= NUMBER_OF_TRIES)
            stateCopy.isGameOver = true;

        const verifiedState = verifyGuess(stateCopy);

        const nextGuessCount = verifiedState.guessCount + 1;
        const isGameOver = nextGuessCount >= NUMBER_OF_TRIES || verifiedState.hasWon;

        return { ...verifiedState, currentGuess: [], guessCount: nextGuessCount, isGameOver: isGameOver };
    }

    const addToHistory = (state) => {
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

        if (state.isGameOver) return state;

        switch (action) {
            case Actions.ADD_LETTER:
                const updatedState = addLetterCurrentGuess(state, payload);
                return addToHistory(updatedState);
            case Actions.REMOVE_LETTER:
                const updatedState2 = removeLastLetterCurrentGuess(state);
                return addToHistory(updatedState2);
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

export default useWoordle;

