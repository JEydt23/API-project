import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotReviews } from '../../store/reviews';

const GetReviewsBySpot = ({ spotDetails }) => {

    const dispatch = useDispatch();
    const spotReviews = useSelector(state => Object.values(state.review.spot));

    useEffect(() => {
        dispatch(getAllSpotReviews(spotDetails.id))
        console.log('&&&&&&&&&&&& spotDetails.id', spotDetails.id)
    }, [dispatch, spotDetails.id])


    if (!spotReviews.length) return null;
    console.log('########### spotReviews', spotReviews)

    return spotReviews && (

        <div>
            <div className='spot-reviews' style={{ border: '800px solid black' }} >
                {console.log('######## spotReviews.review', spotReviews[0].review)}
                {console.log('ele.reviewMAP === ', spotReviews.map(ele => ele.review))}
                <h3>  {spotDetails.name} ★ {spotDetails.avgStarRating}</h3>
                <ul>
                    {spotReviews.map((ele) => (
                        <li key={ele.id}>"{ele.review}" - {ele.User.firstName} {ele.User.lastName}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default GetReviewsBySpot;
