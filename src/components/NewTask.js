import React from 'react'
import {format} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import { FaRegCalendar } from "react-icons/fa";

function NewTask(props) {
  return (
    <div className='add_task' >
        <form>
        <input name="task" value={props.task} onChange={props.handleChange} className='add_task__name' placeholder='Добавить задачу'/>
        <input  name="desc" value={props.desc} onChange={props.handleChange} className='add_task__description' placeholder='Добавить описание'/>
        <select name="category" value={props.category} onChange={props.handleChange} className='add_task__category'>
          <option value="">--Выберите категорию--</option>
          <option value="Дом"><i class="uil uil-home"></i> Дом</option>
          <option value="Работа"><i class="uil uil-briefcase"></i> Работа</option>
          <option value="Хобби"><i class="uil uil-mountains"></i> Хобби</option>
          <option value="Покупки"><i class="uil uil-shopping-bag"></i> Покупки</option>
          <option value="Другое"><i class="uil uil-rocket"></i> Другое</option>
        </select>
        <div className='add_task__date'><FaRegCalendar onClick={()=>props.showCal()} /> {format(props.selectedDay,'EEE d MMM',{locale:ruLocale})}</div> 
       
        <div className='add_task__buttons'>
        {!props.edit && <button className={`add_task__buttons add ${!props.task && 'inactive'}`} disabled={!props.task} onClick={()=>{props.sendData();props.setNameItem();props.hidePop();props.defaultForm()}}>Добавить</button>}
        {props.edit && <button className={`add_task__buttons add ${!props.task && 'inactive'}`} disabled={!props.task} onClick={()=>{props.editItem(props.buttonId);props.editData(props.buttonId);props.hidePop();props.showEdit()}}>Редактировать</button>}
        <button className='add_task__buttons reject' onClick={()=>{props.hidePop();props.hideEdit();props.defaultForm()}}>Отмена</button>
        </div>
        </form>
    </div>
  )
}

export default NewTask