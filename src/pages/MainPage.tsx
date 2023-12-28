import React, {useState} from 'react';
import Container from "../components/elements/Container";
import CurrentDate from "../components/calendarDays/CurrentDate";
import TableDays from "../components/calendarDays/TableDays";
import FlexContainer from "../components/elements/FlexContainer";
import {useSearchParams} from "react-router-dom";

const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const year = Number(searchParams.get('year'))
    const month = Number(searchParams.get('month'))
    const initDate = year ? (month ? new Date(year, month - 1) : new Date(year)) : new Date()
    const [now, setNow] = useState(initDate)
    const addSearchParams = (name: string, value: string) => {
        searchParams.set(name, value)
        setSearchParams(searchParams)
    }

    const plusMonth = () => {
        const fullDate = new Date(now.getFullYear(), now.getMonth() + 1)
        setNow(fullDate)
        addSearchParams('year', String(fullDate.getFullYear()))
        addSearchParams('month', String(fullDate.getMonth() + 1))
    }

    const minusMonth = () => {
        const fullDate =new Date(now.getFullYear(), now.getMonth() - 1)
        setNow(fullDate)
        addSearchParams('year', String(fullDate.getFullYear()))
        addSearchParams('month', String(fullDate.getMonth() + 1))
    }

    return (
        <Container>
            <FlexContainer $height={"300px"} $width={"350px"} $direction={"column"} $align={"center"}>
                <CurrentDate minusMonth={minusMonth} plusMonth={plusMonth} now={now}/>
                <TableDays now={now}/>
            </FlexContainer>
        </Container>
    );
};

export default MainPage;