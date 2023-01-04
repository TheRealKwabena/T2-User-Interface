import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api";
import './SearchBar.css';
import { Stack, Autocomplete, TextField } from '@mui/material';
import { container, locationOnLoad } from "./mapSettings";
import { dentistries } from '../../data/dentistries';

export type DentistryType = {
    name: string,
    coordinate: google.maps.LatLngLiteral,
    address: string
}

const Map = () => {
    const [searchResult, setResult] = useState<string | null> (null) 
    
    const dentistriesList: string[] = dentistries.map((dentistry, index) => {return dentistry.name});

    const [clickedDentistry, setClickedDentistry] = React.useState<DentistryType>({} as DentistryType);

    const selectedDentistry = dentistries.find(e => e.name === searchResult)

    const onClicked = (dentistry: DentistryType) => {
        setClickedDentistry(dentistry);
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
    });

    const mapReference = React.useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map): void => {
        mapReference.current = map;
    };

    const onUnMount = (): void => {
        mapReference.current = null;
    };

    if (!isLoaded) return <div>Loading</div>;
    return (
        <div>
            <div className='search_bar_container'>
                <Stack id='search-bar' spacing= {2}>
                    <Autocomplete
                    disablePortal
                    id="combo-box"
                    sx={{ width: 600 , borderRadius: '10px'}}
                    options={dentistriesList}
                    renderInput={(params) => <TextField {...params} label='Search by name or location'/>}
                    value={searchResult}
                    onChange={(event: any, newValue: string | null) => setResult(newValue)}
                    freeSolo
                    /> 
                </Stack>
            </div>

        <GoogleMap
            mapContainerStyle={container}
            center={locationOnLoad}
            onUnmount={onUnMount}
            zoom={11}
        >

        {
            selectedDentistry?.coordinate && 
            (
                <InfoWindow
                position={selectedDentistry.coordinate}
                onCloseClick={() => setClickedDentistry({} as DentistryType)}  
                >
                <>
                <p>Name: {selectedDentistry.name}</p> 
                <p>Address: {selectedDentistry.address}</p>            
                </>         
                </InfoWindow>
            )
        }   

        {
            dentistries.map(dentistry => {
              return (
                  <Marker
                      key={dentistry.name}
                      position={dentistry.coordinate}
                      onClick={() => { onClicked(dentistry) }}
                  />
              )
            })
        }
        {
            clickedDentistry.coordinate && 
            (
                <InfoWindow
                position={clickedDentistry.coordinate}
                onCloseClick={() => setClickedDentistry({} as DentistryType)}  
                >
                <>
                <p>Name: {clickedDentistry.name}</p> 
                <p>Address: {clickedDentistry.address}</p>            
                </>         
                </InfoWindow>
            )
        }
        </GoogleMap>
        </div>
  );
};


export default Map;
