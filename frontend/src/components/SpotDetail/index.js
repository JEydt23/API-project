import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getOneSpot } from "../../store/spots";
import SpotDetail from './SpotDetail'
import { useParams } from "react-router-dom";


const GetSpotDetail = () => {
    const spotDetails = useSelector(state => state.spot.viewSingleSpot);
    const { spotId } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    if (!spotDetails) return null;
    return (
        <div>
            <SpotDetail key={spotDetails.id} spotDetails={spotDetails} />
        </div>
    )
}

export default GetSpotDetail;
