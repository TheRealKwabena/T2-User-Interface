import { Card } from '@material-ui/core';
import React, { useState } from 'react';
import './Appointments.css';
import Map from '../../components/GoogleMapsApi/Map';
import DentistryCard from '../../components/ListOfDentistries/ListOfDentistries';



const Appointments: React.FC = () => {

    return (
        <div className='container'>
            <div className='card'>
                <div className='title'>
                    Book an appointment
                </div>
                <div className='map'>
                    <Map />
                </div>
                <div className='dentistry_card'>
                    <DentistryCard />
                </div>
            </div>
        </div>
    )
}

export default Appointments;