import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
// import { getAllSpotReviews } from '../../store/reviews';
// import { useEffect } from 'react';

import './SpotDetail.css'


const SpotDetail = ({ spotDetails }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { spotId } = useParams();
    const spotImage = spotDetails.SpotImages;
    // const spotReviews = useSelector(state => Object.values(state.review.spot));

    // useEffect(() => {
    //     dispatch(getAllSpotReviews())
    // }, [dispatch])

    if (!spotImage) return null;
    // if (!spotReviews.length) return null;

    const handleDelete = async (e) => {
        e.preventDefault();
        // console.log('***************', spotDetails.id)
        await history.push('/')
        await dispatch(deleteSpot(spotDetails.id))

    }



    return (
        <div>
            <div className='spotDetails'>
                <h1>{spotDetails.name}</h1>
                <button className="spot-delete-button" onClick={handleDelete}
                >Delete Spot</button>
                <NavLink exact to={`/spots/${spotDetails.id}/edit`}>
                    <button className='spot-edit-button'>
                        Edit Spot
                    </button>
                </NavLink>
                <p>★{spotDetails.avgStarRating} . {spotDetails.city}, {spotDetails.country}</p>
                <img src={spotDetails.SpotImages[0].url} alt={spotDetails.name} id='spotDetailImage'></img>
                <div className='name'>
                </div>
            </div>
            {/* <div className='spot-reviews' >
                {console.log(spotReviews)}
                {spotReviews.map(review => (
                    <p>{review}</p>
                ))}
            </div> */}
        </div>
    )
}

export default SpotDetail;
