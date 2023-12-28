import React, {memo} from 'react';
import FlexContainer from "../elements/FlexContainer";
import styled from "styled-components";
import {hours} from "../dates";

const EmptyDay = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid transparent;
`
const HourCell = styled.div`
    height: 20px;
    width: 60px;
    border-left: 1px solid lightgray;
`

const OneDayEmptyEntity = memo(() => {
    return (
        <FlexContainer $width={"100%"} $others={"border-right: 1px solid transparent; border-left: 1px solid transparent;"}>
            <EmptyDay/>
            <EmptyDay>
                ALL<br/>
                DAY
            </EmptyDay>
            {hours.map(ent =>
                <FlexContainer $direction={"column"} key={ent} $justify={'flex-end'} $others={"font-size: 15px;"}>
                    {((ent) % 3 === 0) &&
                        <>
                            {(ent) % 3 === 0 ? `${ent}:00` : ""}
                            <HourCell/>
                        </>
                    }
                </FlexContainer>
            )}
        </FlexContainer>
    );
})

export default OneDayEmptyEntity;