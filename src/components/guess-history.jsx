import React from "react";
import styled from "styled-components";

const GuessHistory = ({ data }) => {
  return (
    <StyledHistory>
      {data.map((guess, index) => (
        <StyledHistoryRow key={index}>
          {guess.map(({ letter }, index) => (
            <StyledHistoryCell key={index}>{letter}</StyledHistoryCell>
          ))}
        </StyledHistoryRow>
      ))}
    </StyledHistory>
  );
};

GuessHistory.propTypes = {};

export default GuessHistory;

const StyledHistory = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
`;

const StyledHistoryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const StyledHistoryCell = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  background-color: #cbcbcb;
  width: 1em;
  height: 1em;
  padding: 15px;
`;
