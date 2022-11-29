import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
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