import React from 'react'
import {format} from 'date-fns'
import ruLocale from "date-fns/locale/ru";

function DoneItems(props) {
  return (
    <>
      {props.doneItems.length===0 && <p className='no_tasks'>Выполненных задач пока нет.</p>}
        {
        props.doneItems.map(el=>
        <div className='tasklist__item'>
        <div className='taskdesc'>
          <h3>{el.nameItem}</h3>
          <p className='description'>{el.descItem}</p>
          </div>
         <p className='dateitem'>{format(el.dayItem,'EEE d MMM',{locale:ruLocale})}</p>
          <div className='cat_buttons'>
            <div className='buttons'>
              <button onClick={()=>{window.confirm('Вы уверены,что хотите удалить задачу?') && props.deleteDoneData(el.id);props.deleteDoneItem(el.nameItem,el.descItem,el.catItem)}}>
              <i class="uil uil-trash"></i>
              </button>
            </div>
            <p className='category'>{el.catItem}</p>
            </div>
          </div>
          )
        }
    </>
  )
}

export default DoneItems