import Header from './components/Header';
import Tasks from './components/Tasks';
import React from 'react';
import NewTask from './components/NewTask';
import {Routes,Route,Navigate} from 'react-router-dom'
import {Home,Work,Hobby,Purchases,Other,Done} from './components/Pages';
import UpcomingTasks from './components/UpcomingTasks';
import {TailSpin} from  'react-loader-spinner';
import {formatISO} from 'date-fns'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      // Флаг окна создания новой задачи
      pop:false, 
      // Флаг календаря
      cal:false,
      // Флаг окна изменения задачи
      edit:false,
      // Флаг меню
      menu:true,
      // Значения полей ввода задачи: task - название, desc - описание, category - категория,
      // selectedDay - выбранный день
      task:"",
      desc:"",
      category:"",
      selectedDay:new Date(),
      // Массив дней с задачами
      daysWithTasks:[],
      // Массив задач
      items:[
      ],
      // Маасив выполенных задач
      doneItems:[],
      // Идентификатор редактируемой задачи
      buttonId:0,
      // Флаг загрузки данных с сервера
      isLoaded:false,
    }
  }
   // Функция, управляющая открытием/закрытием окна добавления задачи
  showPop=()=> {
    return this.setState({pop:!this.state.pop})
  }
  // Функция, управляющая открытием календаря
  showCal=()=>{
    return this.setState({cal:!this.state.cal})
  }

   // Функция, управляющая открытием редактирования задачи
  showEdit=()=>{
    return this.setState({edit:!this.state.edit})
  }

   // Функция, управляющая открытием календаря
  showMenu=()=>{
    return this.setState({menu:!this.state.menu})
  }

  // Функция, управляющая закрытием редактирования задачи
  hideEdit=()=>{
    return this.setState({edit:false})
  }

  // Функция, управляющая закрытием добавления задачи
  hidePop=()=>{
    return this.setState({pop:false})
  }

  // Функция, управляющая закрытием меню
  hideMenu=()=>{
    return this.setState({menu:false})
  }

    // Функция, управляющая закрытием календаря
  hideCal=()=>{
    return this.setState({cal:false})
  }

  // Функция, фиксирующая изменение значений полей ввода
  handleChange=(e)=>{
    return this.setState({
      [e.target.name]:e.target.value
    })
  }

  // Функция инкремента идентификатора задачи
  increaseId=()=>{
    return this.setState({id:this.state.id+1})
  }

  // Добавление задач в массив  
  setNameItem=()=>{
    this.state.items.length===0 && this.setState({items:[...this.state.items,{
      id:1,
      nameItem:this.state.task,
      descItem:this.state.desc,
      catItem:this.state.category,
      dayItem:this.state.selectedDay
      }]})

    this.state.items.length>0 && this.setState({items:[...this.state.items,{
      id:this.state.items.at(-1).id+1,
      nameItem:this.state.task,
      descItem:this.state.desc,
      catItem:this.state.category,
      dayItem:this.state.selectedDay
      }]})
  }

  // Отправка данных на сервер для добавления задачи в БД
  sendData=async()=>{
    try{
      const response= await fetch('https://todo-backend-kappa-plum.vercel.app/',{
        method:'POST',
          headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(this.state.items.length>0 ? {
          id:this.state.items.at(-1).id+1,
          nameItem:this.state.task,
          descItem:this.state.desc,
          catItem:this.state.category,
          dayItem:formatISO(this.state.selectedDay,{representation:'date'}),
          isDone:0
        }:
        {
          id:1,
          nameItem:this.state.task,
          descItem:this.state.desc,
          catItem:this.state.category,
          dayItem:formatISO(this.state.selectedDay,{representation:'date'}),
          isDone:0
        }
        )
      });
      const result=await response.json();
      console.log(result.sql)
    }
      catch(err){
        console.log(err)
      }
  }

  // Запрос на сервер для удаления задачи из БД по идентификатору
  deleteData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-kappa-plum.vercel.app/',{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body:JSON.stringify({
        id:this.state.items.at(index-1).id
      }
      )})
        
      const result=await response.json();
      console.log(result)
    }
      catch(err){
        console.log(err)
      }
  }

  // Отправка данных на сервер для удаления выполненной задачи из БД
  deleteDoneData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-kappa-plum.vercel.app/',{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body:JSON.stringify({
        id:this.state.doneItems.at(index-1).id
      }
      )})
        
      const result=await response.json();
      console.log(result)
    }
      catch(err){
        console.log(err)
      }
  }

  // Запрос на сервер для изменения параметров задачи в БД при ее изменении пользователем 
  editData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-kappa-plum.vercel.app/',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body:JSON.stringify({
        id:index,
        nameItem:this.state.task,
        descItem:this.state.desc,
        catItem:this.state.category,
        dayItem:formatISO(this.state.selectedDay,{representation:'date'}),
        isDone:0
      }
      )})
        
      const result=await response.json();
      console.log(result)
    }
      catch(err){
        console.log(err)
      }
  }

  //  Запрос на сервер для пометки задачи в БД как выполненной 
  setDatatoDone=async(index,name,desc,cat)=>{
    try{
      const response= await fetch('https://todo-backend-kappa-plum.vercel.app/',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
      body:JSON.stringify({
        id:index,
        nameItem:name,
        descItem:desc,
        catItem:cat,
        dayItem:formatISO(this.state.selectedDay,{representation:'date'}),
        isDone:1
      }
      )})
        
      const result=await response.json();
      console.log(result)
    }
      catch(err){
        console.log(err)
      }
  }

// Изменение задачи
editItem=(index)=>{
this.setState({items:[...this.state.items.slice(0,index-1),
  {
  id:this.state.items.at(index-1).id,
  nameItem:this.state.task,
  descItem:this.state.desc,
  catItem:this.state.category,
  dayItem:this.state.selectedDay},
  ...this.state.items.slice(index)]})  
}

// Удаление задачи из массива задач
  deleteItem=(n,ds,c)=>{
   this.setState({items:this.state.items.filter(el=>el.nameItem!==n || el.descItem!==ds || el.catItem!==c)})
  }

// Пометка задачи как выполненной
setDoneItem=(indx)=>{
  this.setState({doneItems:[...this.state.doneItems,this.state.items[indx]]})
}

// Удаление выполненной задачи
deleteDoneItem=(n,ds,c)=>{
  this.setState({doneItems:this.state.doneItems.filter(el=>el.nameItem!==n || el.descItem!==ds || el.catItem!==c)})
 }

//  Установка значений формы новой задачи по умолчанию
  defaultForm=()=>{
    this.setState({task:""})
    this.setState({desc:""})
    this.setState({category:""})
  }

// Установка значений для окна редактируемой задачи
  toEditForm=(name,description,cat,day)=>{
    this.setState({task:name})
    this.setState({desc:description})
    this.setState({category:cat})
    this.setState({selectedDay:day})
  }

  // Выбор дня в календаре
  selectDay=(d)=>{
    this.setState({selectedDay:d})
  }

  // Установка идентификатора редактируемой задачи
  setButtonId=(num)=>{
    this.setState({buttonId:num})
  }

  // Добавление в массив дней с задачами 
  setDaysWithTasks=()=>{
    this.setState(...this.state.daysWithTasks,this.state.items.dayItem)
  }

  // Загрузка данных с сервера при первичном рендеринге
  componentDidMount=async()=>{
    try
    {
    const response= await fetch('https://todo-backend-kappa-plum.vercel.app/');
    const data = await response.json();
    data.length===0 && this.setState({isLoaded:true})
    
    for (let i=0;i<data.length;i++) {
      this.setState({item:this.state.items.push({
        id:data[i].id,
        nameItem: data[i].nameItem,
        descItem:data[i].descItem,
        catItem:data[i].catItem,
        dayItem:new Date(data[i].dayItem)
      }),
      isLoaded:true})

      data[i].isDone === 1 &&
      this.setState({doneItems:this.state.items.splice(i,1)})
    }
  }
    catch(err){
      console.log(err)
    }
  }
  render() {
    return (
    // Если данные успешно получены и загружены с сервера, они отображаются на странице,
    // в противном случае отображается лоадер

    this.state.isLoaded ?
    <div className='wrapper' >
    <Header selectDay={this.selectDay} pop={this.state.pop} showPop={this.showPop} cal={this.state.cal} showCal={this.showCal}
    menu={this.state.menu} showMenu={this.showMenu} items={this.state.items} selectedDay={this.state.selectedDay} 
    hideCal={this.hideCal} hidePop={this.hidePop}
    />

    {/* Маршрутизация при помощи React Router */}
    <Routes>
      
    {/* Перенаправление на страницу задач на сегодня */}
    <Route path='/' element={<Navigate to='/today' />}/>

    {/* Страница с задачами на сегодня */}
    <Route path='/today' element={<Tasks selectDay={this.selectDay} selectedDay={this.state.selectedDay} dayItem={this.state.items.dayItem} items={this.state.items} 
    cal={this.state.cal} handleChange={this.handleChange} editItem={this.editItem} showPop={this.showPop} 
    deleteItem={this.deleteItem} setNameItem={this.setNameItem} defaultForm={this.defaultForm} showEdit={this.showEdit}
    setButtonId={this.setButtonId} setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm} />}/>

    {/* Страница с предстоящими задачами */}
    <Route path='/upcoming' element={<UpcomingTasks  items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>

    {/* Страница с выполненными задачами */}
    <Route path='/done' element={<Done doneItems={this.state.doneItems} deleteDoneItem={this.deleteDoneItem}
    deleteDoneData={this.deleteDoneData}/>}/>

    {/* Задачи с категорией Дом */}
    <Route path='/category/home' element={<Home items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}
    />}/>

     {/* Задачи с категорией Работа */}
    <Route path='/category/work' element={<Work items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>

     {/* Задачи с категорией Хобби */}
    <Route path='/category/hobby' element={<Hobby items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
    
     {/* Задачи с категорией Покупки */}
    <Route path='/category/purchases' element={<Purchases items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
    
     {/* Задачи с категорией Другое */}
    <Route path='/category/other' element={<Other items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
   
    </Routes>
    
    {/* Окно для создания новой задачи */}
    {this.state.pop  &&
    
       <NewTask sendData={this.sendData} task={this.state.task} desc={this.state.desc} category={this.state.category} 
    selectedDay={this.state.selectedDay} handleChange={this.handleChange} setNameItem={this.setNameItem}  pop={this.state.pop} hidePop={this.hidePop} 
    defaultForm={this.defaultForm} edit={this.state.edit} editItem={this.editItem} showEdit={this.showEdit} 
    increaseId={this.increaseId} items={this.state.items} buttonId={this.state.buttonId} hideEdit={this.hideEdit} 
    editData={this.editData} showCal={this.showCal}
    />
    }
    
      </div>

    :<div className='loader'>
    <TailSpin
    height="80"
    width="80"
    color="black"
    ariaLabel="tail-spin-loading"
    radius="1"
    visible={true}
  />
  </div>
   
  )
}
}

export default App;

