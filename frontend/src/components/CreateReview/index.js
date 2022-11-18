import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";

function CreateReview({ spot }) {
    const currentUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(false);
    const [validations, setValidations] = useState([]);


    useEffect(() => {
        const errors = [];
        if (!review.length) errors.push("Review must not be empty");
        if (review.length > 100) errors.push("Review must be shorter than 100 characters.")
        if (review.length < 2) errors.push("Review must be larger than 2 characters.")
        if (stars > 5) errors.push("You cannot give this location more than 5 stars.")
        setValidations(errors)
    }, [review, stars])

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
            <form onSubmit={handleSubmit}>

                <h1>Leave a Review for this location</h1>
                <ul className='errorsList'>
                    {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    {/* Review Message */}
                    <input
                        type="text"
                        placeholder="Write a review here"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    {/* Stars */}
                    <input
                        type="number"
                        placeholder="How many stars would you rate this place?"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button id='create-review-button' class='review-buttons' type="submit">Create Review</button>
            </form>
        </>

    );

}


export default CreateReview;
