import React from 'react';
import { format } from 'date-fns';
import ruLocale from "date-fns/locale/ru";


function CalendarHeader({ date, onPrevMonth, onNextMonth }) {
  return (
    <div className="calendar-header">
      {/* Кнопка показа следующего месяца */}
      <button onClick={onPrevMonth}>&lt;</button>
      {/* Текущая дата */}
      <h2>{format(date, 'MMM yyyy',{locale:ruLocale})}</h2>
      {/* Кнопка показа предыдущего месяца */}
      <button onClick={onNextMonth}>&gt;</button>
    </div>
  );
}

export default CalendarHeader;