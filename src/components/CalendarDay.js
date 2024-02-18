import { format,isBefore,endOfYesterday,isToday} from 'date-fns';


function CalendarDay({ day, days,selectDay,selectedDay,items}) {

    return (
        <tr key={day} >
            {/* Отображение дней календаря */}
            {days.map((d) => (
                <td key={d} >
                    <div 
                    // Выбор даты при нажатии на соответсвующую ячейку календаря
                    onClick={()=>selectDay(d)} 
                    // Различные стили в зависимости от даты
                    className={`
                    // Стиль для сегоднящней даты
                    ${isToday(d)&&'today'} 
                    // Стиль для прошедших дат
                    ${isBefore(d,endOfYesterday())&&'past'}
                    // Стиль для выбранного дня
                    ${d.toJSON()===selectedDay.toJSON()&&'selected_day'}  
                    // Стиль для дат с задачами
                    ${items.some(e=>e.dayItem.toDateString()===d.toDateString())&&'tasks'}
                     `}>
                        {format(d, 'd')}
                    </div>
                </td>
            )
            )}
        </tr>
    );
}
export default CalendarDay;