import React from "react";
import { bool } from "prop-types";

const EndCard = ({ hasWon }) => {
  return (
    <Modal>
      <main>
        <h1>WINNER</h1>
      </main>
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
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 50%;

  main {
    width: 200px;
    height: 200px;
  }
`;
