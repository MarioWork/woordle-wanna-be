import { useState } from 'react'

const NUMBER_OF_LETTERS = 2;
const NUMBER_OF_TRIES = 1;

const useWoordle = () => {
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [guessHistory, setGuessHistory] = useState([]);


    const addGuess = (guess) => {
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

    const removeLastGuess = () => {
        setCurrentGuess((currentGuess) =>
            [...currentGuess.slice(0, currentGuess.length - 1)]
        );
    };

    const submitGuess = () => {
        setGuessCount(guessCount => guessCount + 1);
        setGuessHistory(guessHistory => [...guessHistory, currentGuess]);

        if (guessCount === NUMBER_OF_TRIES) {
            setIsGameOver(true);
        }


    };

    return {
        currentGuess,
        isGameOver,
        hasWon,
        addGuess,
        removeLastGuess,
        submitGuess,
    };
};


export default useWoordle;