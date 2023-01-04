import { useState } from "react";
import styled from "styled-components";
import GuessHistory from "./components/guess-history";
import VirtualKeyboard from "./components/virtual-keyboard";
import PhysicalKeyboard from "./components/physical-keyboard";
import useWoordle from "./hooks/use-woordle";
import EndCard from "./components/end-card";

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const {
    guessHistory,
    hasWon,
    isGameOver,
    word,
    addLetterToCurrentGuess,
    removeLastLetterOfCurrentGuess,
    submitGuess,
  } = useWoordle();

  return (
    <StyledContent>
      {isGameOver && showModal && (
        <EndCard
          hasWon={hasWon}
          word={word}
          onClose={() => setShowModal(false)}
        />
      )}
      <main>
        <h1>Woordle Wanna Be</h1>
        <GuessHistory data={guessHistory} />
        <VirtualKeyboard
          addLetterToCurrentGuess={addLetterToCurrentGuess}
          removeLastLetterOfCurrentGuess={removeLastLetterOfCurrentGuess}
          submitGuess={submitGuess}
        />
        <PhysicalKeyboard
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
  height: 100vh;
  width: 100vw;
  background-color: #2b3a55;

  main {
    margin-top: 4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
    height: 60%;
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
