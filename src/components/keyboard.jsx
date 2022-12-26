import { func } from "prop-types";
import React from "react";
import styled from "styled-components";
import { KeyboardKeys } from "../constants/keyboard-keys";

const Keyboard = ({ addGuess, removeLastGuess, submitGuess }) => {
  const onClick = ({ target: { name: key } }) => {
    if (String(key).toLowerCase() === "delete") {
      removeLastGuess();
      return;
    }

    if (String(key).toLowerCase() === "enter") {
      submitGuess();
      return;
    }

    addGuess(key);
  };

  return (
    <StyledKeyboard>
      {KeyboardKeys.map((row, index) => (
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

Keyboard.propTypes = {
  addGuess: func.isRequired,
  removeLastGuess: func.isRequired,
  submitGuess: func.isRequired,
};

export default Keyboard;

const StyledKeyboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

  &:hover {
    background: #ababab;
  }
`;
