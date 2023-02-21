import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({spotDetails}) {

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    const defaultProps = {
        center: {
            lat: spotDetails.lat,
            lng: spotDetails.lng
        },
        zoom: 12
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: '950px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                <AnyReactComponent
                    lat={spotDetails.lat}
                    lng={spotDetails.lng}
                    text={<i class="fa fa-map-marker" aria-hidden="true" style={{color:'red', fontSize: '28px'}}></i>}

                />
            </GoogleMapReact>
        </div>
    );
}
