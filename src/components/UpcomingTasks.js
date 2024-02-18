import React from 'react'
import {compareAsc} from 'date-fns'
import {format} from 'date-fns'
import ruLocale from "date-fns/locale/ru";

function UpcomingTasks(props) {
  const date=new Date()
  return (
    <div>
      <main>
        <div className='task'>
            <h2 className='task__today'>Предстоящие задачи</h2>
        </div> 
        {/* Проверка, есть ли предстоящие задачи */}
        {!props.items.some(e=>compareAsc(e.dayItem,date)>0) && <p className='no_tasks'>Предстоящих задач нет.</p>}

        {/* Отображение списка предстоящих задач */}
        {props.items.map((el,i)=>  
        (compareAsc(el.dayItem,date)>0) &&
        <div className='tasklist__item'>
          {/* Отображение кнопки выполнения задачи, ее названия и описания */}
          <div className='checklist'>
            <div title='Задача выполнена' className='tasklist__item_round' onClick={()=>{props.setDatatoDone(el.id,el.nameItem,el.descItem,el.catItem);props.setDoneItem(i);props.deleteItem(el.nameItem,el.descItem,el.catItem);
              alert(`Задача ${el.nameItem} выполнена!`)}}>
              <div className='check'>
                <i class="uil uil-check"></i>
              </div>
            </div>
            <div className='taskdesc'>
              <h4>{el.nameItem}</h4>
              <p className='description'>{el.descItem}</p>
            </div>
          </div>

          {/* Кнопки редактирования, удаления, и категория задачи */}
          <p className='dateitem'>{format(el.dayItem,'EEE d MMM',{locale:ruLocale})}</p>
          <div className='cat_buttons'> 
            <div className='buttons'>
              <button title='Редактировать задачу' onClick={()=>{props.toEditForm(el.nameItem,el.descItem,el.catItem,el.dayItem);props.showPop();props.showEdit();props.setButtonId(el.id)}}>
                <i class="uil uil-edit-alt"></i>
              </button>
              <button title='Удалить задачу' onClick={()=>{if (window.confirm('Вы уверены,что хотите удалить задачу?')){ props.deleteData(i+1);props.deleteItem(el.nameItem,el.descItem,el.catItem)}}}>
                <i class="uil uil-trash"></i>
              </button>
              </div>
              <p className='category'>{el.catItem}</p>
            </div>
          </div> 
    
      )
    }
    </main>
    </div>
  )
  
}

export default UpcomingTasks