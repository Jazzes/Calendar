import React, {FC} from 'react';
import styled from "styled-components";
import {monthes} from "../dates";

interface ICurrentDate{
    now: Date,
    plusMonth: () => void,
    minusMonth: () => void
}

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    font-size: 20px;
`

const Arrow = styled.svg`
    cursor: pointer;
    width: 40px;
    height: 40px;
`

const BlockDate = styled.div`
    width: 200px;
    text-align: center;
    user-select: none;
`

const CurrentDate : FC<ICurrentDate> = ({now , plusMonth, minusMonth}) => {
    return (
        <Wrapper>
            <Arrow onClick={minusMonth} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </Arrow>

            <BlockDate>
                {monthes[now.getMonth()]} {now.getFullYear()}
            </BlockDate>

            <Arrow onClick={plusMonth} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </Arrow>
        </Wrapper>
    );
};

export default CurrentDate;