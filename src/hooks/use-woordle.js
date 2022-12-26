import { useState } from 'react'

const NUMBER_OF_LETTERS = 5;

const useWoordle = () => {
    const [currentGuess, setCurrentGuess] = useState([]);

    const addGuess = (guess) => {
        if (currentGuess.length < NUMBER_OF_LETTERS)
            setCurrentGuess((currentGuess) => [...currentGuess, guess]);
    };

    return {
        currentGuess,
        addGuess
    }
}


export default useWoordle;