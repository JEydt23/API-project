// import { csrfFetch } from './csrf';

const ALL_SPOT_REVIEWS = '/reviews/SPOT_REVIEWS'

// ******* ACTION CREATOR *******

// GET ALL REVIEWS FOR SPOT ACTION CREATOR

const allSpotsReviewAction = (reviews) => {
    return {
        type: ALL_SPOT_REVIEWS,
        reviews
    }
}


// ****** THUNKS *******

// GET ALL REVIEWS FOR SPOT THUNK

export const getAllSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(allSpotsReviewAction(reviews))
    }
}

// REVIEW REDUCER

const reviewReducer = (state = { spot: {} }, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_SPOT_REVIEWS:
            // More or less same as spotsReducer's get all spots
            action.reviews.Reviews.array.forEach(review => newState.spot[review.id] = review);
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
