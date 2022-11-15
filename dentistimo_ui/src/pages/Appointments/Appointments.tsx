import { Card } from '@material-ui/core';
import React from 'react';
import './Appointments.css';
import Map from '../../components/GoogleMapsApi/Map'

export interface IAppointmentProps {}

const Appointments: React.FunctionComponent<IAppointmentProps> = () => {
    return (
        <div className='container'>
            <div className='card'>
                <div className='title'>
                    Book an appointment
                </div>
                <div className='map'>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default Appointments;