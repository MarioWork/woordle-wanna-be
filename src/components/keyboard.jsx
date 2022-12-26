import React from "react";
import styled from "styled-components";
import { KeyboardKeys } from "../constants/keyboard-keys";

const Keyboard = () => {
  return (
    <StyledKeyboard>
      {KeyboardKeys.map((row, index) => (
        <StyledKeyboardRow key={index}>
          {row.map((key) => (
            <StyledKey key={key}>{key}</StyledKey>
          ))}
        </StyledKeyboardRow>
      ))}
    </StyledKeyboard>
  );
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
