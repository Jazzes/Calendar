import styled from "styled-components";

export const NamedDay = styled.div<{ $active: boolean }>`
    font-size: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid lightgray;
    transition: .3s linear;
    background: ${props => props.$active ? "#ebebeb" : "none"};
`

export const AllDay = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const HourCell = styled.div<{ $turned: boolean}>`
    height: 50px;
    width: 20px;
    cursor: pointer;
    transition: .1s linear;
    border-left: 1px solid lightgray;
    background: ${props => props.$turned ? "#ebebeb" : "none"};

    &:hover {
        background: #f0f0f0;
    }
`