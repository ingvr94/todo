import React from 'react'


function FilterOfItems(props) {
  return (
    <div>
      {!props.items.some(e=>e.catItem.includes(props.cat)) && <p className='no_tasks'>{`Задач с категорией ${props.cat} нет.`}</p>}
      {props.items.map((el,i)=>
        el.catItem.includes(props.cat) &&
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
        </div>)}</div>
  )
}

export default FilterOfItems