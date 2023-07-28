import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays} from 'date-fns';
import CalendarDay from './CalendarDay';

function CalendarTable({ date,selectDay,selectedDay,items}) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart,{weekStartsOn:1});
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    const WEEK_DAYS = ["пнд", "втр", "срд", "чтв", "птн", "суб", "вск"]

    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(day);
            day = addDays(day, 1);
        }
        rows.push({ day, days })
        days = [];
    }

    return (
        <table className="calendar-table">
            <thead>
                <tr>
                    {WEEK_DAYS.map((day) => (
                        <th>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{rows?.map((row) => (
                <CalendarDay day={row.day} date={date} days={row.days} selectDay={selectDay} 
                selectedDay={selectedDay} items={items}/>
            ))}</tbody>
        </table>
    );
}

export default CalendarTable;