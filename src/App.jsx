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
      <main>
        <h1>Woordle Wanna Be</h1>
        <GuessHistory data={guessHistory} />
        <Keyboard
          addLetterToCurrentGuess={addLetterToCurrentGuess}
          removeLastLetterOfCurrentGuess={removeLastLetterOfCurrentGuess}
          submitGuess={submitGuess}
        />
      </main>
    </StyledContent>
  );
};

export default App;

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #2b3a55;

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2e5e5;
    padding: 3em;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 20px;

    h1 {
      color: #2b3a55;
    }
  }
`;
