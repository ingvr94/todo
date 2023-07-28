import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';


function Calendar(props) {
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  return (
    <div className="calendar">
      <CalendarHeader
        date={date}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarTable date={date} selectDay={props.selectDay} selectedDay={props.selectedDay} items={props.items}/>
    </div>
  );
}

export default Calendar;