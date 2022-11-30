import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
  
const DatePicker: React.FC = () => {

    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <div className='datetime-container'>
            <DateTimePicker onChange={handleDateChange} value={selectedDate} />
        </div>
        
    )
}



export default DatePicker;