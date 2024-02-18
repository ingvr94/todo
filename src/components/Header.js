import React from 'react'
import { FaRegCalendar } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import { FaRegClock} from "react-icons/fa";
import Calendar from './Calendar';
import Menu from './Menu';
import {Link} from 'react-router-dom'
import { motion,AnimatePresence } from "framer-motion"
import { endOfToday, isBefore } from 'date-fns';

export default function Header(props) {
    return (
      <header>
          <div>
              {/* Лого хеадера */}
              <span className='header__logo'><Link style={{textDecoration:"none",color:"black"}} to='/'><FaRegClock className='fa fa-clock'/><span className='header__logo_letters'>rganizer</span></Link></span>
              {/* Панель управления хеадера */}
              <ul className='header__nav'>
                <li><FaRegPlusSquare title='Добавить задачу' disabled={isBefore(props.selectedDay,endOfToday())} onClick={()=>props.showPop()} className={`fa fa-plus ${props.pop && 'active'}`}/></li>
                <li><FaRegCalendar title='Открыть календарь' onClick={()=>{props.selectDay(new Date());props.showCal()}} className={`fa fa-calendar ${props.cal && 'active'}`}/></li>
                <li><FaTh title='Открыть меню' onClick={()=>props.showMenu()}className={`fa fa-th ${props.menu && 'active'}`}/></li>
              </ul>
          </div>
           
            {/* Меню с анимацией планого вертикального появления и закрытия */}
            <AnimatePresence>
              {props.menu &&
              <motion.div
                initial={{height:0,opacity:0}}
                animate={{height:"auto",opacity:1}}
                exit={{height:0,opacity:0}}
                >
                <Menu categories={props.category} selectDay={props.selectDay} hideCal={props.hideCal} hidePop={props.hidePop} />
              </motion.div>}
            </AnimatePresence>
          <AnimatePresence>

          {/* Календарь с анимацией планого вертикального появления и закрытия*/}
          {props.cal &&
          <motion.div 
          initial={{height:0,opacity:0}}
          animate={{height:"auto",opacity:1}}
          exit={{height:0,opacity:0}}>
             <Calendar selectDay={props.selectDay} selectedDay={props.selectedDay} items={props.items} />
            </motion.div>}
          </AnimatePresence>
      </header>
      )}
      