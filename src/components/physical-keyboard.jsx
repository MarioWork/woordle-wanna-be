import { func } from "prop-types";
import { useEffect } from "react";
import { PhysicalLetterKeysAllowed } from "../constants/physical-letter-keys-allowed";
PhysicalLetterKeysAllowed;

const EventsType = {
  KEY_DOWN: "keydown",
};

const ActionKeys = {
  DELETE: "backspace",
  ENTER: "enter",
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
    const lowerCaseKey = key.toLowerCase();
    switch (lowerCaseKey) {
      case ActionKeys.DELETE:
        removeLastLetterOfCurrentGuess();
        break;
      case ActionKeys.ENTER:
        submitGuess();
      default:
        if (PhysicalLetterKeysAllowed.includes(lowerCaseKey.toUpperCase()))
          addLetterToCurrentGuess(lowerCaseKey);
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
