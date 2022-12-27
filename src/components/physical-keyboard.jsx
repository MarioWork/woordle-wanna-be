import React from "react";
import { func } from "prop-types";

const PhysicalKeyboard = ({
  addLetterToCurrentGuess,
  removeLastLetterOfCurrentGuess,
  submitGuess,
}) => {};

PhysicalKeyboard.propTypes = {
  addLetterToCurrentGuess: func.isRequired,
  removeLastLetterOfCurrentGuess: func.isRequired,
  submitGuess: func.isRequired,
};

export default PhysicalKeyboard;
