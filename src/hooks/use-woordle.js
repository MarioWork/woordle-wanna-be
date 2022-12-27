import { useState } from 'react'

const NUMBER_OF_LETTERS = 5;
const NUMBER_OF_TRIES = 6;

const createDefaultGuessHistory = () => {
    let history = [];

    for (let i = 0; i < NUMBER_OF_TRIES; i++) {
        let historyGuess = [];

        for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
            historyGuess.push("");
        }
        history.push(historyGuess);
    }

    return history;
};

const useWoordle = () => {
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [guessHistory, setGuessHistory] = useState(createDefaultGuessHistory());


    const addLetterToCurrentGuess = (guess) => {
        if (currentGuess.length < NUMBER_OF_LETTERS) {
            setCurrentGuess((currentGuess) => [...currentGuess, guess]);
            return;
        }

        if (currentGuess.length === NUMBER_OF_LETTERS) {
            setCurrentGuess((currentGuess) => {
                const currentGuessCopy = currentGuess;
                currentGuessCopy[NUMBER_OF_LETTERS - 1] = guess;
                return [...currentGuessCopy];
            });
            return;
        }
    };

    const removeLastLetterOfCurrentGuess = () => {
        setCurrentGuess((currentGuess) =>
            [...currentGuess.slice(0, currentGuess.length - 1)]
        );
    };

    const submitGuess = () => {
        if (currentGuess.length !== NUMBER_OF_LETTERS) return;

        setGuessCount(guessCount => guessCount + 1);
        setGuessHistory(history => {
            const mutatedHistory = history.slice(0, history.length - 1);
            return [currentGuess, ...mutatedHistory];
        });

        if (guessCount === NUMBER_OF_TRIES) {
            setIsGameOver(true);
        }

    };

    return {
        currentGuess,
        guessHistory,
        isGameOver,
        hasWon,
        addLetterToCurrentGuess,
        removeLastLetterOfCurrentGuess,
        submitGuess,
    };
};


export default useWoordle;