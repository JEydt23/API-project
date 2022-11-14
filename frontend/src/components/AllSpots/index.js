import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import AllSpots from './AllSpots'

const ShowAllSpots = () => {
    const getSpots = useSelector(state => Object.values(state.spot.viewAllSpots))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!getSpots.length) return null;
    return (
        <div id='giant-box' style={{ border: '2px solid red' }}>
            {console.log(getSpots)}
            {getSpots.map(spot => (
                <AllSpots key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default ShowAllSpots;
