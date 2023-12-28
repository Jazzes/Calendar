import React, {useContext, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Container from "../components/elements/Container";
import FlexContainer from "../components/elements/FlexContainer";
import {UserContext} from "../context/Context";
import {days} from "../components/dates";
import OneDayEntity from "../components/calendarWeek/OneDayEntity";
import OneDayEmptyEntity from "../components/calendarWeek/OneDayEmptyEntity";
import {findWeekByDate} from "../components/FindWeekByDate";
import Buttons from "../components/calendarWeek/Buttons";
import {emptyDay, initChanges} from "../context/InitForTests";

const WeekPage = () => {
    const {week, changeWeek} = useContext(UserContext)
    const {date} = useParams()
    const currentWeek = findWeekByDate(week, date!)

    const [wasChanges, setWasChanges] = useState<boolean[]>([...initChanges])
    const [changeCurrentDays, setChangeCurrentDays] = useState(false)
    const [restartChangedDays, setRestartChangedDays] = useState(false)

    const [draggedCell, setDraggedCell] = useState<number | null>(null)
    const [movedCell, setMovedCell] = useState<number | null>(null)

    const [startEqual, setStartEqual] = useState(false)


    const weekDays = useRef([
        currentWeek ? currentWeek.days[0] : emptyDay,
        currentWeek ? currentWeek.days[1] : emptyDay,
        currentWeek ? currentWeek.days[2] : emptyDay,
        currentWeek ? currentWeek.days[3] : emptyDay,
        currentWeek ? currentWeek.days[4] : emptyDay,
        currentWeek ? currentWeek.days[5] : emptyDay,
        currentWeek ? currentWeek.days[6] : emptyDay
    ])

    const changeEqual = (state: boolean) => {
        setStartEqual(state)
    }

    const changeDraggedCell = (ent : number | null) => {
        setDraggedCell(ent)
    }
    const changeMovedCell = (ent : number | null) => {
        setMovedCell(ent)
    }

    const addChange = (index: number) => {
        wasChanges[index] = true
        const p = [...wasChanges]
        // const p = [...wasChanges] // интересный момент здесь произошел, разберем.
        // p[index] = true
        setWasChanges(p)
    }

    const deleteChange = (index: number) => {
        const p = [...wasChanges]
        p[index] = false
        setWasChanges(p)
    }


    const saveChanges = () => {
        if (wasChanges.includes(true)) {
            setChangeCurrentDays(true)
            setWasChanges([...initChanges])
            setTimeout(() => {
                changeWeek({days: weekDays.current, startDate: date!})
                setChangeCurrentDays(false)
            })
        }
    }

    const clearChanges = () => {
        if (wasChanges.includes(true)) {
            setRestartChangedDays(prev => !prev)
            setWasChanges([...initChanges])
            setTimeout(() => {
                setRestartChangedDays(false)
            })
        }
    }

    return (
        <Container>
            <ButtonBack/>
            <FlexContainer $direction={"column"} $others={"position: relative;"}>
                <FlexContainer $direction={"column"}>
                    <OneDayEmptyEntity/>
                    {days.map((ent, index) =>
                        <OneDayEntity key={ent} changeCurrentDays={changeCurrentDays} index={index}
                                      currentDay={weekDays.current} currentWeek={currentWeek} namedDay={ent}
                                      deleteChange={deleteChange} addChange={addChange} wasChanges={wasChanges}
                                      restartChangedDays={restartChangedDays} changeDraggedCell={changeDraggedCell}
                                      changeMovedCell={changeMovedCell} movedCell={movedCell} draggedCell={draggedCell}
                                      changeEqual={changeEqual} startEqual={startEqual}
                        />
                    )}
                </FlexContainer>
                <Buttons wasChanges={wasChanges} clearChanges={clearChanges} saveChanges={saveChanges}/>
            </FlexContainer>
        </Container>
    );
};

export default WeekPage;