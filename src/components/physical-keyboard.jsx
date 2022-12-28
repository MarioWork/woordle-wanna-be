import { func } from "prop-types";
import { useEffect } from "react";
import { PhysicalLetterKeysAllowed } from "../constants/physical-letter-keys-allowed";
PhysicalLetterKeysAllowed;

const EventsType = {
  KEY_DOWN: "keydown",
};

const PhysicalKeyboard = ({
  addLetterToCurrentGuess,
  removeLastLetterOfCurrentGuess,
  submitGuess,
}) => {
  useEffect(() => {
    document.addEventListener(EventsType.KEY_DOWN, onKeyDown);

    return () => document.removeEventListener(EventsType.KEY_DOWN, onKeyDown);
  }, []);

  const onKeyDown = (e) => {
    const upperCaseKey = e.key.toUpperCase();
    if (PhysicalLetterKeysAllowed.includes(upperCaseKey)) {
      addLetterToCurrentGuess(upperCaseKey);
    }
  };
};

PhysicalKeyboard.propTypes = {
  addLetterToCurrentGuess: func.isRequired,
  removeLastLetterOfCurrentGuess: func.isRequired,
  submitGuess: func.isRequired,
};

export default PhysicalKeyboard;
