import React from "react";
import GoogleMapReact from 'google-map-react';
import './GoogleMaps.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// console.log("text ====", text)}

export default function SimpleMap({spotDetails}) {

    const handleApiLoaded = (map, maps) => {
        console.log('apiIsLoaded')
        if (map) {
            map.setOptions({ gestureHandling: 'greedy', mapTypeControl: false, minZoom: 2});
        }
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
        <div style={{ height: '400px', width: '950px', paddingTop: '25px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                
                >
                <AnyReactComponent
                    lat={spotDetails.lat}
                    lng={spotDetails.lng}
                    text={<i className="fa fa-map-marker" aria-hidden="true" style={{color:'red', fontSize: '28px'}}></i>}

                />
            </GoogleMapReact>
        </div>
    );
}
