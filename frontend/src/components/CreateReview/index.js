import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";

function CreateReview({ spot }) {
    const currentUser = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spot.viewSingleSpot);
    const spotReviews = useSelector(state => Object.values(state.review.allSpots));

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(false);
    const [validations, setValidations] = useState([]);
    // console.log('------CURRENT SPOT----- ', currentSpot)

    useEffect(() => {
        const errors = [];
        if (!review.length) errors.push("Review must not be empty");
        if (review.length > 255) errors.push("Review must be shorter than 255 characters.")
        if (review.length < 2) errors.push("Review must be larger than 2 characters.")
        if (stars > 5) errors.push("You cannot give this location more than 5 stars.")
        if (stars < 0) errors.push("You cannot give this location less than 0 stars.")
        if (currentUser && (currentUser.id === currentSpot.ownerId)) errors.push('You cannot review a location you own.')

        // if (review) errors.push("You have already reviewed this location.")



        setValidations(errors)
    }, [review, stars])
    let reviewed;
    if (currentUser) spotReviews.find(review => review.userId === currentUser.id) ? reviewed = true : reviewed = false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true);

        if (!validations.length) {
            const payload = {
                review, stars, spotId
            }
            const newReview = await dispatch(createReviewThunk(payload, currentUser))
            if (newReview) {
                await history.push(`/spots/${spotId}`)
            }
        }
    }
    return (
        <>
            {currentUser && <form hidden={reviewed} onSubmit={handleSubmit}>
                <div className="review-box">
                    <h4 className="leave-review-h4">Leave a Review for this location</h4>
                    <ul className='errorsList-reviews'>
                        {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className="review-input">
                    <label>
                        {/* Review Message */}
                        <input className="review-inputs-write"
                            type="text"
                            placeholder="Write a review here"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        {/* Stars */}
                        <input className="review-inputs-stars"
                            type="number"
                            min='0'
                            max='5'
                            placeholder="How many stars would you rate this place?"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <button id='create-review-button' class='review-buttons' type="submit">Create Review</button>
            </form>}
        </>

    );

}


export default CreateReview;
