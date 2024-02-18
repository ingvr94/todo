import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';


function Calendar(props) {
  const [date, setDate] = useState(new Date());

  // Просмотр предыдущего месяца в календаре перед текущим
  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

   // Просмотр следующего месяца в календаре после текущего
  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  return (
    <div className="calendar">
      {/* Шапка календаря */}
      <CalendarHeader
        date={date}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      {/* Тело календаря */}
      <CalendarTable date={date} selectDay={props.selectDay} selectedDay={props.selectedDay} items={props.items}/>
    </div>
  );
}

export default Calendar;