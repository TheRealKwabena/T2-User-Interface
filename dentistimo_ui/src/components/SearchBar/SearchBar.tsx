import React from 'react';
import { useState } from 'react';
import './SearchBar.css';
import dentistries from '../../data/dentistries';
import { Stack, Autocomplete, TextField } from '@mui/material';
import { borders } from '@mui/system';

const SearchBar = () => {
    const [value, setValue] = useState<string | null> (null) 
    const dentistriesList: string[] = dentistries.map((dentistry, index) => {return dentistry.name});
    
    return (
        <Stack spacing= {2}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 , borderRadius: '15px' }}
            options={dentistriesList}
            renderInput={(params) => <TextField {...params} label='Search by name or location ...'/>}
            value={value}
            onChange={(event: any, newValue: string | null) => setValue(newValue)}
            freeSolo
            />
        </Stack>
    )
}

export default SearchBar;