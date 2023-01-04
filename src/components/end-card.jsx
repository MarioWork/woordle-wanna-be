import React from "react";
import { bool } from "prop-types";
import styled from "styled-components";

const EndCard = ({ hasWon, onClose, word }) => {
  return (
    <Modal>
      <article>
        <h1>
          {hasWon ? "Congratulations you win!" : "Better luck next time!"}
        </h1>
        <h4>{`The word was '${word}'`}</h4>
        <h6>
          {hasWon
            ? "Hope you enjoyed your time!"
            : "Press restart to play again!"}
        </h6>

        <footer>
          <button onClick={() => window.location.reload(true)}>Restart</button>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </Modal>
  );
};

EndCard.propTypes = {
  hasWon: bool.isRequired,
};

export default EndCard;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #808080a2;

  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4em;
    width: 500px;
    height: 120px;
    background-color: #f2e5e5;
    padding: 3em;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 20px;
    gap: 10px;
    color: #2b3a55;

    footer {
      display: flex;
      gap: 10px;
      margin-top: 1em;

      button {
        background: #cbcbcb;
        min-width: 3em;
        min-height: 3em;
        border: none;
        border-radius: 15px;
        padding: 1em;
        cursor: pointer;
        font-weight: bold;

        &:hover {
          background: #ababab;
        }
      }
    }
  }
`;
