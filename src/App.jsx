import React from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import useWoordle from "./hooks/use-woordle";
styled;

const App = () => {
  const {
    guessHistory,
    hasWon,
    isGameOver,
    addLetterToCurrentGuess,
    removeLastLetterOfCurrentGuess,
    submitGuess,
  } = useWoordle();

  console.log(guessHistory);

  if (isGameOver) {
    return <p>{hasWon ? "WON" : "LOST"}</p>;
  }

  return (
    <StyledContent>
      <StyledHistory>
        {guessHistory.map((guess, index) => (
          <StyledHistoryRow key={index}>
            {guess.map(({ letter }, index) => (
              <div key={index}>{letter}</div>
            ))}
          </StyledHistoryRow>
        ))}
      </StyledHistory>
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

const StyledHistory = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
`;

const StyledHistoryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;

  div {
    display: flex;
    justify-content: center;
    border: 1px solid black;
    width: 1em;
    height: 1em;
    padding: 15px;
  }
`;
