import React, {FC} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {IDayItem} from "../calendarDays/TableDays";
import {WeekEntity} from "../../models/models";
import {findWeekByDate} from "../FindWeekByDate";

const BlockDay = styled(Link)`
    width: 14%;
    text-align: center;
    padding: 13px 0;
    cursor: pointer;
    color: black;
    text-decoration: none;
    transition: .3s linear;
    position: relative;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20%;
    border: 3px solid white;

    &:hover {
        transform: scale(1.1);
    }
`
const Circle = styled.div`
    width: 10px;
    height: 10px;
    background: grey;
    border-radius: 10px;
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
`

interface IDayEntity {
    entity: IDayItem,
    days: IDayItem[],
    index: number
    week: WeekEntity[]
}

const DayEntity: FC<IDayEntity> = ({entity, week, days, index}) => {
    const weekIndex = index - index % 7
    const month = ((days[weekIndex].month + 1) < 10) ? ("0" + (days[weekIndex].month + 1)) : `${(days[weekIndex].month + 1)}`
    const currentWeek = findWeekByDate(week, `${days[weekIndex].year}-${month}-${days[weekIndex].date}`)

    return (
        <BlockDay to={"/" + days[weekIndex].year + "-" + month + "-" + days[weekIndex].date}>
            <>
                {entity.date}
                {currentWeek && currentWeek.days[index % 7]? (
                        currentWeek.days[index % 7].includes(true) &&
                        <Circle/>
                    )
                    : (
                        <></>
                    )
                }
            </>
        </BlockDay>
    );
}

export default DayEntity;