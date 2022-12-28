import { useEffect, useState } from 'react';
import { LetterSpaceType } from "../constants/letter-space-type"; //Container Type
import { concatArrOfObjPropVal } from "../utils/concat-arr-obj-prop-val";

const NUMBER_OF_LETTERS = 5;
const NUMBER_OF_TRIES = 6;

const createDefaultGuessHistory = () => {
    let history = [];

    for (let i = 0; i < NUMBER_OF_TRIES; i++) {
        let historyGuess = [];

        for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
            historyGuess.push({ letter: "", spaceType: LetterSpaceType.DEFAULT });
        }
        history.push(historyGuess);
    }

    return history;
};

const useWoordle = () => {
    const [word, setWord] = useState("L");
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [guessHistory, setGuessHistory] = useState(createDefaultGuessHistory());

    console.log(currentGuess.length);

    useEffect(() => {
        setGuessHistory((history) => {
            const historyCopy = [...history];
            const arrayOfMissingGuessLetters = Array(NUMBER_OF_LETTERS - currentGuess.length).fill({ letter: "", spaceType: LetterSpaceType.DEFAULT });
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
        setCurrentGuess((currentGuess) => {
            if (currentGuess.length >= NUMBER_OF_LETTERS - 1) {
                setCurrentGuess((currentGuess) => {
                    const currentGuessCopy = currentGuess;
                    currentGuessCopy[NUMBER_OF_LETTERS - 1] = { letter: letter, spaceType: LetterSpaceType.DEFAULT };
                    return [...currentGuessCopy];
                });
            }

            return [...currentGuess, { letter: letter, spaceType: LetterSpaceType.DEFAULT }]
        });


    }

    const removeLastLetterOfCurrentGuess = () => {
        setCurrentGuess((currentGuess) =>
            [...currentGuess.slice(0, currentGuess.length - 1)]
        );
    };


    const submitGuess = () => {
        if (currentGuess.length !== NUMBER_OF_LETTERS) return;

        if (concatArrOfObjPropVal(currentGuess, "letter") === word) {
            setHasWon(true);
            setIsGameOver(true);
        }

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