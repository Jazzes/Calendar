import React, {FC} from 'react';
import styled from "styled-components";
import {ChildrenNode} from "../../models/models";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container : FC<ChildrenNode> = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default Container;