import { useEffect, useState } from 'react';
import { LetterContainerType } from "../constants/letter-container-type"; //Container Type
import { concatArrOfObjPropVal } from "../utils/concat-arr-obj-prop-val";

const NUMBER_OF_LETTERS = 5;
const NUMBER_OF_TRIES = 6;

const createDefaultGuessHistory = () => {
    let history = [];

    for (let i = 0; i < NUMBER_OF_TRIES; i++) {
        let historyGuess = [];

        for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
            historyGuess.push({ letter: "", spaceType: LetterContainerType.DEFAULT });
        }
        history.push(historyGuess);
    }

    return history;
};

const useWoordle = () => {
    const [word, setWord] = useState("HELLO");
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [guessHistory, setGuessHistory] = useState(createDefaultGuessHistory());
    const [submissionCount, setSubmissionCount] = useState(0);

    useEffect(() => {
        setGuessHistory((history) => {
            const historyCopy = [...history];
            const arrayOfMissingGuessLetters = Array(NUMBER_OF_LETTERS - currentGuess.length).fill({ letter: "", spaceType: LetterContainerType.DEFAULT });
            historyCopy[guessCount] = [...currentGuess, ...arrayOfMissingGuessLetters];
            return historyCopy;
        });
    }, [currentGuess]);


    useEffect(() => {
        if (currentGuess.length !== NUMBER_OF_LETTERS) return;

        //Need to add validation
        if (concatArrOfObjPropVal(currentGuess, "letter") === word) {
            setHasWon(true);
            setIsGameOver(true);
        }

        setGuessCount(guessCount => guessCount + 1);

        setCurrentGuess([]);

    }, [submissionCount]);


    useEffect(() => {
        if (guessCount === NUMBER_OF_TRIES) {
            setIsGameOver(true);
        }
    }, [guessCount]);


    const addLetterToCurrentGuess = (letter) => {
        const upperCaseLetter = letter.toUpperCase();
        setCurrentGuess((currentGuess) => {
            //Alternate last letter to the new one
            if (currentGuess.length >= NUMBER_OF_LETTERS) {
                const currentGuessCopy = currentGuess;
                currentGuessCopy[NUMBER_OF_LETTERS - 1] = { letter: upperCaseLetter, spaceType: LetterContainerType.DEFAULT };
                return [...currentGuessCopy];
            }

            return [...currentGuess, { letter: upperCaseLetter, spaceType: LetterContainerType.DEFAULT }]
        });
    }

    const removeLastLetterOfCurrentGuess = () => {
        setCurrentGuess((currentGuess) =>
            [...currentGuess.slice(0, currentGuess.length - 1)]
        );
    };

    //Fix to work with submit on physical
    const submitGuess = () => {
        setSubmissionCount(count => count + 1);
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