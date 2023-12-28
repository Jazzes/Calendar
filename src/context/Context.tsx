import React, {createContext, FC, useState} from 'react';
import {IUserContext, WeekEntity} from "../models/models";
import {initWeeks} from "./InitForTests";
import {findIndexByDate} from "../components/FindWeekByDate";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const InitContext : IUserContext = {
    week: initWeeks,
    changeWeek: () => {}
}

export const UserContext = createContext<IUserContext>(InitContext)

interface IContext{
    children: React.ReactNode
}

const Context : FC<IContext> = ({children}) => {
    const [week, setWeek] = useState<WeekEntity[]>(initWeeks)

    const changeWeek = (changedWeek: WeekEntity) => {
        const index = findIndexByDate(week, changedWeek.startDate)
        const p = [...week]
        if (index)
            p[index] = changedWeek
        else
            p.push(changedWeek)
        setWeek(p)
        localStorage.setItem(changedWeek.startDate, JSON.stringify(changedWeek.days))
    }


    const value = {
        week,
        changeWeek
    }
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default Context;