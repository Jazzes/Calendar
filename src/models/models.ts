import React from "react";

export interface ChildrenNode{
    children: React.ReactNode
}

export interface WeekEntity{
    startDate: string,
    days: boolean[][]
}

export interface User{
    week: WeekEntity[]
}

export interface IUserContext extends  User{
    changeWeek: (changedWeek: WeekEntity) => void,
}