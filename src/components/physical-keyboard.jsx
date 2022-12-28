import { func } from "prop-types";
import { useEffect } from "react";
import { PhysicalLetterKeysAllowed } from "../constants/physical-letter-keys-allowed";
PhysicalLetterKeysAllowed;

const EventsType = {
  KEY_DOWN: "keydown",
};

const ActionKeys = {
  DELETE: "BACKSPACE",
  ENTER: "ENTER",
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

  const onKeyDown = ({ key }) => {
    const upperCaseKey = key.toUpperCase();

    switch (upperCaseKey) {
      case ActionKeys.DELETE:
        removeLastLetterOfCurrentGuess();
        break;
      case ActionKeys.ENTER:
        submitGuess();
      default:
        if (PhysicalLetterKeysAllowed.includes(upperCaseKey))
          addLetterToCurrentGuess(upperCaseKey);
        break;
    }
  };
};

PhysicalKeyboard.propTypes = {
  addLetterToCurrentGuess: func.isRequired,
  removeLastLetterOfCurrentGuess: func.isRequired,
  submitGuess: func.isRequired,
};

export default PhysicalKeyboard;
