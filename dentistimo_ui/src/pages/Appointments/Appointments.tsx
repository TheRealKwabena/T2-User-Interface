import React, { useState } from 'react';
import './Appointments.css';
import Map from '../../components/GoogleMapsApi/Map';
import dentistries from '../../data/dentistries.json';



const Appointments: React.FC = () => {

    return (
        <div className='container'>
            <div className='card'>
                <div className='title'>
                    Book an appointment
                </div>
                <div className='map'>
                    <Map />
                    <div className='dentistry_container'>
                        {
                            dentistries.map((dentistry, index) => (
                                <div className='dentistry_card' key={index}>
                                    <p className='name'> Name: {dentistry.name}</p>
                                    <p className='address'> Address: {dentistry.address}</p>
                                    <p className='dentists'> Dentists: {dentistry.dentists}</p>
                                </div>
                        ))}            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments;