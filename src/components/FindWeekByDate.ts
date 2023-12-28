import {WeekEntity} from "../models/models";

export const findWeekByDate = (week: WeekEntity[], date: string) : WeekEntity | null => {
    for (let i = 0; i < week.length; ++i){
        if (week[i].startDate === date){
            return week[i]
        }
    }
    return null
}

export const findIndexByDate = (week: WeekEntity[], date: string) : number | null => {
    for (let i = 0; i < week.length; ++i){
        if (week[i].startDate === date){
            return i
        }
    }
    return null
}