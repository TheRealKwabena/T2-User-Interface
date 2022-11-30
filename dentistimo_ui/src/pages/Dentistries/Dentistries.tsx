import React, { useCallback, useState } from 'react';
import './Dentistries.css';
import Map from '../../components/GoogleMapsApi/Map';
import dentistries from '../../data/dentistries';
import SearchBar from '../../components/SearchBar/SearchBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Dentistries: React.FC = () => {
    const [myEvents, setEvents] = useState(dentistries)


    return (
            <div className='card'>
                <div className='title'>
                    Our Dentistries
                </div>
                    <div className='search_bar_container'>
                        <SearchBar />
                    </div>
                    <Map />
                    <div className='dentistry_container'>
                        {
                            dentistries.map((dentistry, index) => (
                                <Accordion id='accordion' TransitionProps={{ unmountOnExit: true }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                    <p className='name'> Name: {dentistry.name}</p>
                                    <p className='address'> Address: {dentistry.address}</p>
                                    <p className='dentists'> Dentists: {dentistry.dentists}</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>

                                    <Calendar
                                        localizer={localizer}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{ height: 600 }}
                                        timeslots={2}
                                        events={dentistry.appointments}
                                        selectable
                                        />
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))} 
                    </div>
            </div>
    )
}

export default Dentistries;