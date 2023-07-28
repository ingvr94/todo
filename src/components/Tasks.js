import React from 'react'
import {endOfYesterday, format,isBefore} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import { FaPlusCircle } from "react-icons/fa";

function Tasks(props) {
    const date=new Date()
     return ( 
      <main>
        {/*Отображение задач на сегодня без календаря */}
        {!props.cal &&
        <>
        <div className='task'>
            <h2 className='task__today'>Сегодня <span>{format(date,'EEE d MMM',{locale:ruLocale})}</span></h2>
            <button className='task__plus' onClick={()=>{props.showPop()}}><FaPlusCircle className='task__plus_icon'/> <span className='task__plus_label'>+ Добавить задачу</span></button>
        </div> 
        {!props.items.some(e=>e.dayItem.toDateString()===date.toDateString()) && <p className='no_tasks'>Задач на сегодня нет.</p>}
      {
      props.items.map((el,i)=>
        
       (el.dayItem.toDateString()===date.toDateString()) &&
       <div className='tasklist__item'>
       <div className='checklist'>
         <div title='Задача выполнена' className='tasklist__item_round' onClick={()=>{props.setDatatoDone(el.id,el.nameItem,el.descItem,el.catItem);props.setDoneItem(i);props.deleteItem(el.nameItem,el.descItem,el.catItem);
         alert(`Задача ${el.nameItem} выполнена!`)}}>
           <div className='check'>
             <i class="uil uil-check"></i>
           </div>
         </div>
         <div className='taskdesc'>
           <h3>{el.nameItem}</h3>
           <p className='description'>{el.descItem}</p>
           </div>
       </div>
         <div className='cat_buttons'>
           <div className='buttons'>
             <button title='Редактировать задачу' onClick={()=>{props.toEditForm(el.nameItem,el.descItem,el.catItem,el.dayItem);props.showPop();props.showEdit();props.setButtonId(el.id)
             }}>
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
        </>
        }
        {props.cal && 
        <>
        <div className='task'>
          {format(props.selectedDay,'EEE d MMM',{locale:ruLocale})}
          {!isBefore(props.selectedDay,endOfYesterday()) && <button className='task__plus' onClick={()=>props.showPop()}>+ Добавить задачу</button>}
        </div>
        {!props.items.some(e=>e.dayItem.toDateString()===props.selectedDay.toDateString()) && <p className='no_tasks'>Задач на этот день нет.</p>}
         <div>
      {
      props.items.map((el,i)=>
       props.selectedDay.toDateString()===el.dayItem.toDateString() &&
      <div className='tasklist__item'>
        <div className='checklist'>
          <div title='Задача выполнена' className='tasklist__item_round' onClick={()=>{props.setDatatoDone(el.id,el.nameItem,el.descItem,el.catItem);props.setDoneItem(i);props.deleteItem(el.nameItem,el.descItem,el.catItem);
          alert(`Задача ${el.nameItem} выполнена!`)}}>
            <div className='check'>
              <i class="uil uil-check"></i>
            </div>
          </div>
          <div className='taskdesc'>
            <h3>{el.nameItem}</h3>
            <p className='description'>{el.descItem}</p>
            </div>
        </div>
          <div className='cat_buttons'>
            <div className='buttons'>
              <button title='Редактировать задачу' onClick={()=>{props.toEditForm(el.nameItem,el.descItem,el.catItem,el.dayItem);props.showPop();props.showEdit();props.setButtonId(el.id)
              }}>
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
           
    </div>
    </>}
    </main>
  )
}

export default Tasks