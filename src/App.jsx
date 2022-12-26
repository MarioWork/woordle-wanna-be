import React from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
styled;

const App = () => {
  return (
    <StyledContent>
      <Keyboard />
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
`;
