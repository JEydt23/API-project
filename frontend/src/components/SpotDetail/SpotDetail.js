import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import GetReviewsBySpot from '../Reviews';


import './SpotDetail.css'


const SpotDetail = ({ spotDetails }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotImage = spotDetails.SpotImages;
    const currentUser = useSelector(state => state.session.user);





    if (!spotImage) return null;

    const handleDelete = async (e) => {
        e.preventDefault();

        await history.push('/')
        await dispatch(deleteSpot(spotDetails.id))

    }

    return (
        <div className='spot-details-body'>
            <div className='spotDetails'>
                <div className='spot-name-h1'>
                    <h1 >{spotDetails.name}</h1>
                </div>
                <p className='stars-number'>★ {spotDetails.avgStarRating} · {spotDetails.numReviews} Review(s) · {spotDetails.city}, {spotDetails.country}</p>
                <img src={spotDetails.SpotImages[0].url} alt={spotDetails.name} id='spotDetailImage'></img>
                <div className='spot-details-buttons'>
                    {(currentUser && (currentUser.id === spotDetails.ownerId) && <button className="spot-delete-button" onClick={handleDelete}
                    >Delete Spot</button>)}
                    <NavLink exact to={`/spots/${spotDetails.id}/edit`}>
                        {(currentUser && (currentUser.id === spotDetails.ownerId) && <button className='spot-edit-button'>
                            Edit Spot
                        </button>)}
                    </NavLink>
                </div>
            </div>
            <div>
                <GetReviewsBySpot key={spotDetails.id} spotDetails={spotDetails} />
            </div>

        </div>
    )
}

export default SpotDetail;
