import React, { useContext, useEffect, useState } from 'react'
import { GoogleMap, MarkerF, OverlayViewF, OverlayView, DirectionsRenderer } from '@react-google-maps/api';
import { LocationContext } from '@/context/LocationContextProvider';
const containerStyle = {
    width: '100%',
    height: '50vh'
};

function GoogleMapSection() {
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    // })
    const [ center , setCenter ] = useState({
        lat: -3.745,
        lng: -38.523
    })
    const { source, setSource, destination, setDestination } = useContext(LocationContext)
    const [map, setMap] = React.useState(null)
    const [directionRoutePoints, setDirectionRoutePoints] = useState([])
    useEffect(() => {
        if (source?.length!=[]&&map) {
            map.panTo(
                {
                    lat: source.lat,
                    lng: source.lng
                }
            )
            setCenter({
                lat:source.lat,
                lng:source.lng
            })
            console.log(source)
        }
    }, [source]);
    useEffect(() => {
        if (destination?.length != [] && map) {
            map.panTo(
                {
                    lat: destination.lat,
                    lng: destination.lng
                }
            )
            setCenter({
                lat: destination.lat,
                lng: destination.lng
            })
        }
        if( source?.length !=[] && destination?.length!=[]){
            directionRoute()
        }
    }, [destination]);
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const directionRoute = () =>{
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: { lat:source?.lat, lng:source?.lng},
            destination: { lat: destination?.lat, lng: destination?.lng },
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if(status===google.maps.DirectionsStatus.OK){
                console.log(result)
                setDirectionRoutePoints(result)
            }
            else{
                console.log("error")
            }
        })
    }
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return(
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {source?.length !=[]? 
                <MarkerF position={{ lat: source?.lat, lng: source?.lng }}>
                    <OverlayViewF position={{ lat: source?.lat, lng: source?.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div className='p-2 inline-block'>
                            <p className='text-black'>{source?.label}</p>
                        </div>
                    </OverlayViewF>
                </MarkerF> 
                : null}
            {destination?.length != [] ?
                <MarkerF position={{ lat: destination?.lat, lng: destination?.lng }}>
                    <OverlayViewF position={{ lat: destination?.lat, lng: destination?.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div className='p-2 inline-block'>
                            <p className='text-black font-bold text-xl'>{destination?.label}</p>
                        </div>
                    </OverlayViewF>
                </MarkerF>
                : null}
            <DirectionsRenderer 
                directions={directionRoutePoints}
                options={{
                    polylineOptions:{
                        strokeColor: "text-primary",
                        strokeWeight: 5
                    },
                    suppressMarkers: true
                }}
            />
        </GoogleMap>
    )
}

export default React.memo(GoogleMapSection)