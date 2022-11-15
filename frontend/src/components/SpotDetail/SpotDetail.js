import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import './SpotDetail.css'


const SpotDetail = ({ spotDetails }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spotImage = spotDetails.SpotImages;
    if (!spotImage) return null;

    const handleDelete = async (e) => {
        e.preventDefault();
        const spot = {spotId}
        await dispatch(deleteSpot(spot))
        await history.push('/')
    }

    return (
        <div>
            <div className='spotDetails'>
                <h1>{spotDetails.name}</h1>
                <button className="spot-delete-button" onClick={handleDelete}
                >Delete A Spot</button>
                <p>★{spotDetails.avgStarRating} . {spotDetails.city}, {spotDetails.country}</p>
                <img src={spotDetails.SpotImages[0].url} alt={spotDetails.name} id='spotDetailImage'></img>
                <div className='name'>

                </div>
            </div>
        </div>
    )
}

export default SpotDetail;
