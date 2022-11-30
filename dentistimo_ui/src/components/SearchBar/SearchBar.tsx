import React from 'react';
import { useState } from 'react';
import './SearchBar.css';
import { Stack, Autocomplete, TextField } from '@mui/material';
import { borders } from '@mui/system';

const dentistries = ['Tooth Fairy Dentist', 'Your Dentist', 'The Crown', 'Liseberg Dentists']

export const SearchBar = () => {
    const [value, setValue] = useState<string | null> (null) 
    return (
        <Stack spacing= {2}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 , borderRadius: '15px' }}
            options={dentistries}
            renderInput={(params) => <TextField {...params} label='Search by name or location ...'/>}
            value={value}
            onChange={(event: any, newValue: string | null) => setValue(newValue)}
            freeSolo
            />
        </Stack>
    )
}