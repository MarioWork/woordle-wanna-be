import React, { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import useWoordle from "./hooks/use-woordle";
styled;

const App = () => {
  const { currentGuess, addGuess, removeLastGuess } = useWoordle();

  return (
    <StyledContent>
      <div>{currentGuess}</div>
      <Keyboard addGuess={addGuess} removeLastGuess={removeLastGuess} />
    </StyledContent>
  );
};

export default App;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
