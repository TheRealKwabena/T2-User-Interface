import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api";
import { container, locationOnLoad } from "./mapSettings";
import dentistries from '../../data/dentistries.json';

const Map: React.FC = () => {
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
        <GoogleMap
            mapContainerStyle={container}
            center={locationOnLoad}
            onUnmount={onUnMount}
            zoom={11}
        >
        {
            dentistries.map(dentistry => {
              return (
                  <Marker
                      key={dentistry.name}
                      position={dentistry.coordinate}/>
              )
            })
         }
        </GoogleMap>
  );
};


export default Map;
