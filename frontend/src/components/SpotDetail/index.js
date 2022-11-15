import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { useHistory } from "react-router-dom";
import { deleteSpot, getOneSpot } from "../../store/spots";
import SpotDetail from './SpotDetail'
import { useParams } from "react-router-dom";


const GetSpotDetail = () => {
    const spotDetails = useSelector(state => state.spot.viewSingleSpot);
    const [isloaded, setLoaded] = useState(false)
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(getOneSpot(spotId))
            .then(() => {
                setLoaded(true);
            })
    }, [dispatch, spotId])

    // dispatch(deleteSpot(spotId))



    if (!spotDetails) return null;
    return isloaded && (
        <div>
            <SpotDetail key={spotDetails.id} spotDetails={spotDetails} />
        </div>

    )
}

export default GetSpotDetail;
