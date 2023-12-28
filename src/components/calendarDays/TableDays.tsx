import React, {FC, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {days} from "../dates";
import DayEntity from "../elements/DayEntity";
import FlexContainer from "../elements/FlexContainer";
import {UserContext} from "../../context/Context";

const DayName = styled.div`
    font-weight: 700;
    width: 14%;
    text-align: center;
    user-select: none;
`

interface ITableDays {
    now: Date
}

export interface IDayItem {
    date: number,
    month: number,
    year: number
}

const TableDays: FC<ITableDays> = ({now}) => {
    const {week} = useContext(UserContext)
    const numDays = [0, 1, 2, 3, 4, 5, 6]
    const amountDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const [monthDays, setMonthDays] = useState<IDayItem[]>([])
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    useEffect(() => {
        const p: IDayItem[] = []
        let firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
        let lastDayMonth = new Date(now.getFullYear(), now.getMonth(), amountDays).getDay()
        const numPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()

        if (firstDayMonth === 0)
            firstDayMonth = 7
        if (lastDayMonth === 0)
            lastDayMonth = 7

        const prevMonth = ((currentMonth + 12) - 1) % 12
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
        for (let i = firstDayMonth - 2; i > -1; --i)
            p.push({
                date: numPreviousMonth - i,
                month: prevMonth,
                year: prevYear
            })

        for (let i = 0; i < amountDays; ++i)
            p.push({
                date: i + 1,
                month: currentMonth,
                year: currentYear
            })

        const nextMonth = (currentMonth + 1) % 12
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
        for (let i = 7; i > lastDayMonth; --i)
            p.push({
                date: 8 - i,
                month: nextMonth,
                year: nextYear
            })

        setMonthDays(p)
    }, [now, amountDays])

    return (
        <>
            <FlexContainer $margin={"10px 0 0 0"} $width={"100%"} $justify={"space-between"}>
                {numDays.map((ent) =>
                    <DayName key={ent}>
                        {days[ent]}
                    </DayName>
                )}
            </FlexContainer>
            <FlexContainer $margin={"10px 0 0 0"} $width={"100%"} $wrap={"wrap"} $justify={"space-between"}>
                {monthDays.map((ent, index) =>
                    <DayEntity week={week} key={index}
                               days={monthDays} index={index} entity={ent}/>
                )}
            </FlexContainer>
        </>

    );
};

export default TableDays;