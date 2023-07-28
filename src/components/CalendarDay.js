import { format,isBefore,endOfYesterday,isToday} from 'date-fns';


function CalendarDay({ day, days,selectDay,selectedDay,items}) {

    return (
        <tr key={day} >
            {days.map((d) => (
                <td key={d} >
                    <div onClick={()=>selectDay(d)} className={`
                    ${isToday(d)&&'today'} 
                    ${isBefore(d,endOfYesterday())&&'past'}
                    ${d.toJSON()===selectedDay.toJSON()&&'selected_day'}  
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