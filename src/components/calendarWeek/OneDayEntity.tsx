import React, {FC, useEffect, useState} from 'react';
import FlexContainer from "../elements/FlexContainer";
import {hours} from "../dates";
import {WeekEntity} from "../../models/models";
import {emptyDay, fullDay} from "../../context/InitForTests";
import {AllDay, HourCell, NamedDay} from "../elements/OneDayEntityElements";

interface IOneDayEntity {
    namedDay: string
    currentWeek: WeekEntity | null,
    index: number
    currentDay: boolean[][]
    changeCurrentDays: boolean
    restartChangedDays: boolean
    addChange: (index: number) => void
    deleteChange: (index: number) => void
    wasChanges: boolean[]
    movedCell: number | null
    draggedCell: number | null
    changeDraggedCell: (ent: number | null) => void
    changeMovedCell: (ent: number | null) => void
    changeEqual: (state: boolean) => void
    startEqual: boolean
}

const OneDayEntity: FC<IOneDayEntity> = ({
                                            namedDay, index, currentWeek, wasChanges,
                                            deleteChange, addChange, currentDay, changeCurrentDays,
                                            restartChangedDays, changeDraggedCell, changeMovedCell,
                                            draggedCell, movedCell, startEqual, changeEqual
                                        }) => {
    const [allDay, setAllDay] = useState(
        currentWeek ? !currentWeek.days[index].includes(false) : false)
    const [changedDay, setChangedDay] = useState(
        [...currentDay[index]])
    const [dragDay, setDragDay] = useState([...emptyDay])

    const changeFullDay = () => {
        if (!allDay)
            setChangedDay([...fullDay])
        else
            setChangedDay([...emptyDay])
        setAllDay(prev => !prev)
    }

    const changeOneHour = (index: number) => {
        const p = [...changedDay]
        p[index] = !p[index]
        setChangedDay(p)
    }

    const equalDragsAndChanges = () => {
        const p = [...changedDay]
        for (let i = 0; i < dragDay.length; ++i)
            if (dragDay[i])
                p[i] = true
        setDragDay([...emptyDay])
        setChangedDay(p)
    }
    const clearSomeDrags = () => {
        setDragDay([...emptyDay])
    }
    const changeSomeDrags = (start: number, end: number) => {
        const p = [...emptyDay]
        for (let i = start; i <= end; ++i)
            p[i] = true
        setDragDay(p)
    }

    useEffect(() => {
        if (startEqual) {
            equalDragsAndChanges()
            changeEqual(false)
        }
    }, [startEqual]);

    useEffect(() => {
        if (!changedDay.includes(false)) {
            setAllDay(true)
        } else if (allDay) {
            setAllDay(false)
        }

        if (changedDay.toString() === currentDay[index].toString()) {
            deleteChange(index)
        } else if (!wasChanges[index]) {
            addChange(index)
        }
    }, [changedDay]);

    useEffect(() => {
        if (changeCurrentDays) {
            currentDay[index] = changedDay
        }
    }, [changeCurrentDays]);

    useEffect(() => {
        if (restartChangedDays) {
            setChangedDay([...currentDay[index]])
        }
    }, [restartChangedDays])


    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, num: number) => {
        changeDraggedCell(num)
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.dropEffect = "move"
        // e.dataTransfer.setDragImage(new Image(), 0, 0) // интересный момент, ломается сафари
    }
    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>, num: number) => {
        e.preventDefault()
        if (num !== movedCell) {
            changeMovedCell(num)
        }
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        changeEqual(true)
        changeDraggedCell(null)
        changeMovedCell(null)
    }

    useEffect(() => {
        if ((movedCell || movedCell === 0) && (draggedCell || draggedCell === 0)) {
            let firstDayNum = (draggedCell - draggedCell % 24) / 24
            let lastDayNum = (movedCell - movedCell % 24) / 24
            if (lastDayNum < firstDayNum) {
                const temp = firstDayNum
                firstDayNum = lastDayNum
                lastDayNum = temp
            }
            if ((firstDayNum <= index) && (index <= lastDayNum)) {
                const start = draggedCell % 24
                const end = movedCell % 24
                if (start > end)
                    changeSomeDrags(end, start)
                else
                    changeSomeDrags(start, end)
            } else {
                clearSomeDrags()
            }
        }
    }, [movedCell]);


    return (
        <FlexContainer $width={"100%"}
                       $others={"border: 1px solid lightgray; border-bottom: 0;" + (namedDay === "SUN" ? "border-bottom: 1px solid lightgray;" : "")}>
            <NamedDay $active={changedDay.includes(true)}>
                {namedDay}
            </NamedDay>
            <AllDay onClick={() => changeFullDay()}>
                {allDay &&
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                              fill="#000000"/>
                    </svg>
                }
            </AllDay>
            {hours.map((ent, ind) =>
                <HourCell draggable={true}
                          onDragStart={(e) => onDragStartHandler(e, (ent) + 24 * (index))}
                          onDragOver={(e) => onDragOverHandler(e, (ent) + 24 * (index))}
                          onDrop={(e) => onDropHandler(e)}
                          $turned={changedDay[ind] || dragDay[ind]} key={ent} onClick={() => {
                    changeOneHour(ind)
                }}/>
            )}
        </FlexContainer>

    );
}

export default OneDayEntity;