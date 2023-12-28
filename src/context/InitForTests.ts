import {WeekEntity} from "../models/models";

const takeDays = () => {
    const p : WeekEntity[] = []
    let keys = Object.keys(localStorage);
    for(let key of keys) {
        if (Number(key.slice(0, 4))){
            p.push({
                startDate: key,
                days: JSON.parse(localStorage.getItem(key)!)
            })
        }
    }
    return p
}

export const initWeeks = takeDays()

export const initChanges = [false, false, false, false, false, false, false]

export const emptyDay = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
export const fullDay = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
