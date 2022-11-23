import React, { useState } from 'react';
import CalendarR from 'react-calendar';
import './Calendar.css';

const Calendar: React.FC = () => {
    const [date, setDate] = useState(new Date());


    return (
        <div className='section'>
          <div className='title'>Choose an available timeslot</div>
          <div className='calendar-container'>
            <CalendarR onChange={setDate} value={date} />
          </div>
          <p className='text'>
            {date.toDateString()}
          </p>
        </div>
    )
}


export default Calendar;