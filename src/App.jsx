import React from "react";
import { keys } from "./constants/keys";
import styled from "styled-components";
styled;

const App = () => {
  return (
    <StyledContent>
      <StyledKeyboard>
        {keys.map((row) => (
          <StyledKeyboardRow>
            {row.map((key) => (
              <StyledKey>{key}</StyledKey>
            ))}
          </StyledKeyboardRow>
        ))}
      </StyledKeyboard>
    </StyledContent>
  );
};

export default App;

const StyledContent = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const StyledKeyboard = styled.div`
  width: 80%;
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
  background: blue;
  border-radius: 25px;
  padding: 1em;
`;
