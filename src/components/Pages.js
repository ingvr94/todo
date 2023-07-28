import React from 'react'
import FilterOfItems from './FilterOfItems'
import DoneItems from './DoneItems'

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