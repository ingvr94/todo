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
      pop:false,
      cal:false,
      edit:false,
      menu:true,
      task:"",
      desc:"",
      category:"",
      selectedDay:new Date(),
      daysWithTasks:[],
      items:[
      ],
      doneItems:[],
      buttonId:0,
      isLoaded:false,
    }
  }
  showPop=()=> {
    return this.setState({pop:!this.state.pop})
  }
  showCal=()=>{
    return this.setState({cal:!this.state.cal})
  }
  showEdit=()=>{
    return this.setState({edit:!this.state.edit})
  }
  showMenu=()=>{
    return this.setState({menu:!this.state.menu})
  }
  hideEdit=()=>{
    return this.setState({edit:false})
  }
  hidePop=()=>{
    return this.setState({pop:false})
  }
  hideMenu=()=>{
    return this.setState({menu:false})
  }
  hideCal=()=>{
    return this.setState({cal:false})
  }
  handleChange=(e)=>{
    return this.setState({
      [e.target.name]:e.target.value
    })
  }
  increaseId=()=>{
    return this.setState({id:this.state.id+1})
  }
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
  sendData=async()=>{
    try{
      const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app/',{
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
  deleteData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app/',{
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
  deleteDoneData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app/',{
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
  editData=async(index)=>{
    try{
      const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app/',{
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

  setDatatoDone=async(index,name,desc,cat)=>{
    try{
      const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app/',{
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
  deleteItem=(n,ds,c)=>{
   this.setState({items:this.state.items.filter(el=>el.nameItem!==n || el.descItem!==ds || el.catItem!==c)})
  }
setDoneItem=(indx)=>{
  this.setState({doneItems:[...this.state.doneItems,this.state.items[indx]]})
}
deleteDoneItem=(n,ds,c)=>{
  this.setState({doneItems:this.state.doneItems.filter(el=>el.nameItem!==n || el.descItem!==ds || el.catItem!==c)})
 }
 
  defaultForm=()=>{
    this.setState({task:""})
    this.setState({desc:""})
    this.setState({category:""})
  }
  toEditForm=(name,description,cat,day)=>{
    this.setState({task:name})
    this.setState({desc:description})
    this.setState({category:cat})
    this.setState({selectedDay:day})
  }
  selectDay=(d)=>{
    this.setState({selectedDay:d})
  }
  setButtonId=(num)=>{
    this.setState({buttonId:num})
  }
  setDaysWithTasks=()=>{
    this.setState(...this.state.daysWithTasks,this.state.items.dayItem)
  }
  componentDidMount=async()=>{
    try
    {
    const response= await fetch('https://todo-backend-3n2zkx9c0-ingvr94.vercel.app//');
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
      
    this.state.isLoaded ?
    <div className='wrapper' >
    <Header selectDay={this.selectDay} pop={this.state.pop} showPop={this.showPop} cal={this.state.cal} showCal={this.showCal}
    menu={this.state.menu} showMenu={this.showMenu} items={this.state.items} selectedDay={this.state.selectedDay} 
    hideCal={this.hideCal} hidePop={this.hidePop}
    />

  
    <Routes>
   
    <Route path='/' element={<Navigate to='/today' />}/>

    <Route path='/today' element={<Tasks selectDay={this.selectDay} selectedDay={this.state.selectedDay} dayItem={this.state.items.dayItem} items={this.state.items} 
    cal={this.state.cal} handleChange={this.handleChange} editItem={this.editItem} showPop={this.showPop} 
    deleteItem={this.deleteItem} setNameItem={this.setNameItem} defaultForm={this.defaultForm} showEdit={this.showEdit}
    setButtonId={this.setButtonId} setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm} />}/>

    <Route path='/upcoming' element={<UpcomingTasks  items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>

    <Route path='/done' element={<Done doneItems={this.state.doneItems} deleteDoneItem={this.deleteDoneItem}
    deleteDoneData={this.deleteDoneData}/>}/>

    <Route path='/category/home' element={<Home items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}
    />}/>

    <Route path='/category/work' element={<Work items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>

    <Route path='/category/hobby' element={<Hobby items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
    
    <Route path='/category/purchases' element={<Purchases items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
    
    <Route path='/category/other' element={<Other items={this.state.items} showPop={this.showPop} 
    deleteItem={this.deleteItem} showEdit={this.showEdit} setButtonId={this.setButtonId} 
    setDoneItem={this.setDoneItem} deleteData={this.deleteData} 
    setDatatoDone={this.setDatatoDone} toEditForm={this.toEditForm}/>}/>
   
    </Routes>
    
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

