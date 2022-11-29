import React, { useState } from 'react';
import './Dentistries.css';
import Map from '../../components/GoogleMapsApi/Map';
import dentistries from '../../data/dentistries.json';
import SearchBar from '../../components/SearchBar/SearchBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePickerTime from '../../components/DatePicker/DatePicker';



const Dentistries: React.FC = () => {
 

    return (
        <div className='container'>
            <div className='card'>
                <div className='title'>
                    Our Dentistries
                </div>
                <div className='map'>
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

                                    <DatePickerTime />
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dentistries;