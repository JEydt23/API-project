import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotReviews } from '../../store/reviews';
import CreateReview from '../CreateReview';
import { deleteReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';


const GetReviewsBySpot = ({ spotDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotReviews = useSelector(state => Object.values(state.review.spot));

    useEffect(() => {
        dispatch(getAllSpotReviews(spotDetails.id))
        // console.log('&&&&&&&&&&&& spotDetails.id', spotDetails.id)
    }, [dispatch, spotDetails.id])


    const handleReviewDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(spotReviews[0].id))
        alert('Deletion is a success!')
        await history.push(`/spots/${spotDetails.id}`)
    }



    if (!spotReviews.length) return null;
    console.log('&&&&&& spotReviews ===== ', spotReviews)
    // console.log('########### spotReviews', spotReviews[0].id)
    // console.log(`******** spotDetails.id ===`, spotDetails.id)

    return spotReviews && (

        <div>
            <div className='spot-reviews' style={{ border: '800px solid black' }} >
                {/* {console.log('######## spotReviews.review', spotReviews[0].review)}
                {console.log('ele.reviewMAP === ', spotReviews.map(ele => ele.review))} */}
                <CreateReview key={spotDetails.id} spotDetails={spotDetails} />
                <h3>  {spotDetails.name} ★ {spotDetails.avgStarRating}</h3>
                <ul>
                    {spotReviews.map((ele) => (
                        <li key={ele.id}>"{ele.review}" - {ele.User.firstName} {ele.User.lastName}
                        <button id='delete-review-button' onClick={handleReviewDelete}>Delete Review</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default GetReviewsBySpot;
