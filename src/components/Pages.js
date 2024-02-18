import React from 'react'
import FilterOfItems from './FilterOfItems'
import DoneItems from './DoneItems'


// Фильтр элементов с категорией Дом и отображение на соответствующей странице
export function Home(props) {
  return (
  <main>
    <div className='task'>
       <h2 className='task__today'><i class="uil uil-home"></i> Дом</h2>
       </div>
      <FilterOfItems items={props.items} showPop={props.showPop} 
    deleteItem={props.deleteItem} showEdit={props.showEdit} setButtonId={props.setButtonId} 
    setDoneItem={props.setDoneItem} deleteData={props.deleteData} 
    setDatatoDone={props.setDatatoDone} toEditForm={props.toEditForm} cat='Дом' />
  </main>
  )
}

// Фильтр элементов с категорией Работа и отображение на соответствующей странице
export  function Work (props) {
  return (
  <main>
    <div className='task'>
    <h2 className='task__today'><i class="uil uil-briefcase"></i> Работа</h2>
    </div>
    <FilterOfItems items={props.items} showPop={props.showPop} 
    deleteItem={props.deleteItem} showEdit={props.showEdit} setButtonId={props.setButtonId} 
    setDoneItem={props.setDoneItem} deleteData={props.deleteData} 
    setDatatoDone={props.setDatatoDone} toEditForm={props.toEditForm} cat='Работа' />
 </main>
  )
}

// Фильтр элементов с категорией Хобби и отображение на соответствующей странице
export  function Hobby (props) {
  return (
  <main>
    <div className='task'>
    <h2 className='task__today'><i class="uil uil-mountains"></i> Хобби</h2>
    </div>
    <FilterOfItems items={props.items} showPop={props.showPop} 
    deleteItem={props.deleteItem} showEdit={props.showEdit} setButtonId={props.setButtonId} 
    setDoneItem={props.setDoneItem} deleteData={props.deleteData} 
    setDatatoDone={props.setDatatoDone} toEditForm={props.toEditForm} cat='Хобби' />
  </main>
  )
}

// Фильтр элементов с категорией Покупки и отображение на соответствующей странице
export  function Purchases (props) {
  return (
  <main>
    <div className='task'>
    <h2 className='task__today'><i class="uil uil-shopping-bag"></i> Покупки</h2>
    </div>
    <FilterOfItems items={props.items} showPop={props.showPop} 
    deleteItem={props.deleteItem} showEdit={props.showEdit} setButtonId={props.setButtonId} 
    setDoneItem={props.setDoneItem} deleteData={props.deleteData} 
    setDatatoDone={props.setDatatoDone} toEditForm={props.toEditForm} cat='Покупки' />
  </main>
  )
}

// Фильтр элементов с категорией Другое и отображение на соответствующей странице
export  function Other (props) {
  return (
  <main>
    <div className='task'>
    <h2 className='task__today'> <i class="uil uil-rocket"></i> Другое</h2>
    </div>
    <FilterOfItems items={props.items} showPop={props.showPop} 
    deleteItem={props.deleteItem} showEdit={props.showEdit} setButtonId={props.setButtonId} 
    setDoneItem={props.setDoneItem} deleteData={props.deleteData} 
    setDatatoDone={props.setDatatoDone} toEditForm={props.toEditForm} cat='Другое' />
  </main>
  )
}

// Фильтр элементов выполненных задач и отображение на соответствующей странице
export function Done(props){
  return(
  <main>
    <div className='task'>
    <h2 className='task__today'>История</h2>
    </div>
    <DoneItems doneItems={props.doneItems} deleteDoneItem={props.deleteDoneItem} deleteDoneData={props.deleteDoneData}/>
  </main>
  )
}