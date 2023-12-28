import React, {FC} from 'react';
import styled from "styled-components";
import {ChildrenNode} from "../../models/models";

interface IFlexContainer extends ChildrenNode{
    $direction?: string,
    $align?: string,
    $justify?: string,
    $margin?: string,
    $width?: string,
    $wrap?: string,
    $height?: string,
    $others?: {}
}

const StyledFlex = styled.div<IFlexContainer>`
    display: flex;
    flex-direction: ${props => props.$direction || "row"};
    align-items: ${props => props.$align || "stretch"};
    justify-content: ${props => props.$justify || "flex-start"};
    margin: ${props => props.$margin || "0"};
    flex-wrap: ${props => props.$wrap || "nowrap"};
    width: ${props => props.$width || "auto"};
    height: ${props => props.$height || "auto"};
    ${props => props.$others}
`

const FlexContainer : FC<IFlexContainer> = (props) => {
    return (
        <StyledFlex {...props}>
            {props.children}
        </StyledFlex>
    );
};

export default FlexContainer;