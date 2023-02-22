import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import homeMarker from './mapmarker.png'

const Maps = ({ spotDetails }) => {

    //This sets the center of the map. This must be set BEFORE the map loads

    const [currentPosition, setCurrentPosition] = useState({lng: spotDetails.lng, lat: spotDetails.lat})
    console.log(currentPosition)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    })

    const containerStyle = {
        width: '950px',
        height: '400px'
    };



    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    // console.log(currentPosition)

    return isLoaded ? (
        <>

            <div>
                <div style={{ height: '30em', width: '100%' }}>

                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            zoom={12}
                            center={{lng: +spotDetails.lng, lat: +spotDetails.lat}}
                            onUnmount={onUnmount}
                        >
                        <Marker key={spotDetails}
                            position={{lng: +spotDetails.lng, lat: +spotDetails.lat}}
                            title={spotDetails.name}
                            icon={homeMarker}
                            streetView={false}
                            id='current spot'
                            // text={<i className="fa fa-map-marker" aria-hidden="true" style={{ color: 'red', fontSize: '28px' }}></i>}
                            />

                        </GoogleMap>
                </div>

            </div>
        </>
    ): <></>

}

export default Maps
