import { useEffect, useState } from 'react'

const NUMBER_OF_LETTERS = 1;
const NUMBER_OF_TRIES = 2;

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
    const [word, setWord] = useState("lo")
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [guessHistory, setGuessHistory] = useState(createDefaultGuessHistory());

    useEffect(() => {
        setGuessHistory((history) => {
            const historyCopy = [...history];
            const arrayOfMissingGuessLetters = Array(NUMBER_OF_LETTERS - currentGuess.length).fill("");
            historyCopy[guessCount] = [...currentGuess, ...arrayOfMissingGuessLetters];
            return historyCopy;
        });
    }, [currentGuess]);

    useEffect(() => {
        if (guessCount === NUMBER_OF_TRIES) {
            setIsGameOver(true);
        }
    }, [guessCount]);


    const addLetterToCurrentGuess = (letter) => {
        //Alternate last letter of the guess if already exists one
        if (currentGuess.length === NUMBER_OF_LETTERS) {
            setCurrentGuess((currentGuess) => {
                const currentGuessCopy = currentGuess;
                currentGuessCopy[NUMBER_OF_LETTERS - 1] = letter;
                return [...currentGuessCopy];
            });
            return;
        }

        setCurrentGuess((currentGuess) => [...currentGuess, letter]);
    }

    const removeLastLetterOfCurrentGuess = () => {
        setCurrentGuess((currentGuess) =>
            [...currentGuess.slice(0, currentGuess.length - 1)]
        );
    };


    const submitGuess = () => {
        if (currentGuess.length !== NUMBER_OF_LETTERS) return;

        setGuessCount(guessCount => guessCount + 1);

        setGuessHistory(history => {
            const historyCopy = [...history];
            historyCopy[guessCount] = currentGuess;
            return historyCopy;
        });

        setCurrentGuess([]);


    };

    return {
        guessHistory,
        isGameOver,
        hasWon,
        addLetterToCurrentGuess,
        removeLastLetterOfCurrentGuess,
        submitGuess,
    };
};


export default useWoordle;