import { func } from "prop-types";
import React from "react";
import styled from "styled-components";
import { VirtualKeyboardKeys } from "../constants/virtual-keyboard-keys";

const VirtualKeyboard = ({
  addLetterToCurrentGuess,
  removeLastLetterOfCurrentGuess,
  submitGuess,
}) => {
  const onClick = ({ target: { name: key } }) => {
    if (String(key).toLowerCase() === "delete") {
      removeLastLetterOfCurrentGuess();
      return;
    }

    if (String(key).toLowerCase() === "enter") {
      submitGuess();
      return;
    }

    addLetterToCurrentGuess(key);
  };

  return (
    <StyledKeyboard>
      {VirtualKeyboardKeys.map((row, index) => (
        <StyledKeyboardRow key={index}>
          {row.map((key) => (
            <StyledKey key={key} name={key} onClick={onClick}>
              {key}
            </StyledKey>
          ))}
        </StyledKeyboardRow>
      ))}
    </StyledKeyboard>
  );
};

VirtualKeyboard.propTypes = {
  addLetterToCurrentGuess: func.isRequired,
  removeLastLetterOfCurrentGuess: func.isRequired,
  submitGuess: func.isRequired,
};

export default VirtualKeyboard;

const StyledKeyboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2em;
`;

const StyledKeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const StyledKey = styled.button`
  background: #cbcbcb;
  min-width: 3em;
  min-height: 3em;
  border: none;
  border-radius: 15px;
  padding: 1em;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ababab;
  }
`;
