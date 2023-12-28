import React, {FC} from 'react';
import styled from "styled-components";
import FlexContainer from "../elements/FlexContainer";

const Button = styled.div<{$margin?: string, $background? : string}>`
    cursor: pointer;
    padding: 8px 12px;
    background: ${props => props.$background || "#f0f0f0"};
    border: 1px solid lightgrey;
    border-radius: 5px;
    transition: .3s linear;
    margin-right: ${props => props.$margin || "0"};
    margin-top: 20px;

    &:hover {
        background: ${props => props.$background ? "white" : "#f0f0f0"};
    }
`

interface IButtons{
    saveChanges: () => void,
    clearChanges: () => void,
    wasChanges: boolean[]
}

const Buttons : FC<IButtons> = ({saveChanges, clearChanges, wasChanges}) => {
    return (
        <FlexContainer $justify={"flex-end"}>
            <Button $background={wasChanges.includes(true) ? "#b4b4b4" : ""} $margin={"20px"} onClick={clearChanges}>
                Clear
            </Button>
            <Button $background={wasChanges.includes(true) ? "#b4b4b4" : ""} onClick={saveChanges}>
                Save Changes
            </Button>
        </FlexContainer>
    );
};

export default Buttons;