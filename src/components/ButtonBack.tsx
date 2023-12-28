import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Button = styled.div`
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 50px;
    left: 50px;
    cursor: pointer;
    padding: 5px;
    transition: .3s linear;
    &:hover{
        transform: scale(1.1)
    }
`

const ButtonBack = () => {
    const navigate = useNavigate()

    return (
        <Button onClick={() => navigate(-1)}>
            Back
        </Button>
    );
};

export default ButtonBack;