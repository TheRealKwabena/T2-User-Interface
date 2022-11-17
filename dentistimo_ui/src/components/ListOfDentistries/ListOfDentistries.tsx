import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import dentistries from '../../data/dentistries.json';

export type DentistryType = {
    name: string,
    city: string
}

const ListOfDentistries: React.FC = () => {
    return (
        <div>
        {
            dentistries.map((dentistry, index) => (
                <div className='card' key={index}>
                   <p className='name'>{dentistry.name}</p> 
                </div>
         ))}            
        </div>
    )
    
}

export default ListOfDentistries;


