import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { LetterContainerColors } from '../constants/letter-container-colors';

const GuessHistory = ({ data }) => {
    return (
        <StyledHistory>
            {data.map((guess, index) => (
                <StyledHistoryRow key={index}>
                    {guess.map(({ letter, containerType }, index) => (
                        <StyledHistoryCell
                            key={index}
                            background={LetterContainerColors[containerType]}
                        >
                            {letter}
                        </StyledHistoryCell>
                    ))}
                </StyledHistoryRow>
            ))}
        </StyledHistory>
    );
};

GuessHistory.propTypes = {
    data: arrayOf(
        arrayOf(
            shape({
                letter: string,
                containerType: string
            }).isRequired
        ).isRequired
    ).isRequired
};

export default GuessHistory;

const StyledHistory = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    margin-top: 2em;
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
    background-color: ${({ background }) => background};
    width: 1em;
    height: 1em;
    padding: 15px;
    font-weight: bold;
`;

StyledHistoryCell.propTypes = {
    background: string
};
