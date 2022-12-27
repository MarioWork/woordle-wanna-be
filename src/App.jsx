import React from "react";
import styled from "styled-components";
import GuessHistory from "./components/guess-history";
import Keyboard from "./components/keyboard";
import useWoordle from "./hooks/use-woordle";

const App = () => {
  const {
    guessHistory,
    hasWon,
    isGameOver,
    addLetterToCurrentGuess,
    removeLastLetterOfCurrentGuess,
    submitGuess,
  } = useWoordle();

  if (isGameOver) {
    return <p>{hasWon ? "WON" : "LOST"}</p>;
  }

  return (
    <StyledContent>
      <GuessHistory data={guessHistory} />
      <Keyboard
        addLetterToCurrentGuess={addLetterToCurrentGuess}
        removeLastLetterOfCurrentGuess={removeLastLetterOfCurrentGuess}
        submitGuess={submitGuess}
      />
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
