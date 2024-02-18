import React from 'react'
import {Link} from 'react-router-dom'


function Menu(props) {

  return (
    <div className='menu'>
      {/* Список меню с выбором сегодняшних, предстоящих или выполненных задач */}
        <ul className='menu_labels'>
            <li>
             <Link className='menu__link'  to="/today" onClick={()=>props.selectDay(new Date())}>Сегодня</Link> 
            </li>
            <li>
             <Link className='menu__link' to="/upcoming" onClick={()=>{props.hidePop();props.hideCal()}}>Предстоящие</Link>
             </li>
            <li>
             <Link className='menu__link' to="/done" onClick={()=>{props.hidePop();props.hideCal()}}>Выполненные</Link>
             </li>
        </ul>
      {/* Список для выбора категорий задач */}
        <ul >
        <li value="&#127968; Дом">
          <Link className='menu__link_icon'to="/category/home" title='Категория: Дом'><i class="uil uil-home"></i> </Link>
          </li>
        <li value="&#128188; Работа">
        <Link className='menu__link_icon' to="/category/work" title='Категория: Работа'><i class="uil uil-briefcase"></i></Link>
        </li>
        <li value="&#128692; Хобби">
        <Link className='menu__link_icon' to="/category/hobby" title='Категория: Хобби'><i class="uil uil-mountains"></i></Link>
        </li>
        <li value="&#128722; Покупки">
        <Link className='menu__link_icon' to="/category/purchases" title='Категория: Покупки'><i class="uil uil-shopping-bag"></i></Link>
        </li>
        <li value="&#128640; Другое">
        <Link className='menu__link_icon' to="/category/other" title='Категория: Другое'><i class="uil uil-rocket"></i> </Link>
        </li>
        </ul>
    </div>
    
  )
}

export default Menu