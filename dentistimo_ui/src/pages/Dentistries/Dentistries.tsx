import React, { useState } from 'react';
import './Dentistries.css';
import Map from '../../components/GoogleMapsApi/Map';
import dentistries from '../../data/dentistries.json';
import SearchBar from '../../components/SearchBar/SearchBar';



const Appointments: React.FC = () => {

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