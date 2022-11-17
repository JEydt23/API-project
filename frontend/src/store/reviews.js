import { csrfFetch } from "./csrf"

const ALL_SPOT_REVIEWS = '/reviews/SPOT_REVIEWS'
const CREATE_REVIEW = '/reviews/CREATE_REVIEW'
const DELETE_REVIEW = '/reviews/DELETE_REVIEW'

// ******* ACTION CREATOR *******

// GET ALL REVIEWS FOR SPOT ACTION CREATOR

const allSpotsReviewAction = (reviews) => {
    return {
        type: ALL_SPOT_REVIEWS,
        reviews
    }
}

// CREATE REVIEW FOR SPOT ACTION CREATOR

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

// DELETE REVIEW

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

// ****** THUNKS *******

// GET ALL REVIEWS FOR SPOT THUNK

export const getAllSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const data = await response.json();
        // console.log(reviews.Reviews)
        dispatch(allSpotsReviewAction(data.Reviews))
    }
}

// CREATE REVIEW FOR SPOT THUNK

export const createReviewThunk = (reviewObj, user) => async (dispatch) => {

    const { review, stars, spotId } = reviewObj
    // console.log('%%%%%% spotId = ', spotId)
    // console.log("******** spotId.spotId = ", spotId.spotId)
    // console.log("stars = ", stars)
    // console.log("review", review)
    // console.log("addReview = ", addReview)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewObj)
    })
    if (response.ok) {
        const createReview = await response.json();
        createReview.User = user;
        dispatch(createReviewAction(createReview));
        return createReview;
    }
}

// DELETE REVIEW THUNK

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    // console.log('9999999 reviewId = ', reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}/`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

// REVIEW REDUCER

const reviewReducer = (state = { spot: {} }, action) => {

    switch (action.type) {
        case ALL_SPOT_REVIEWS: {
            // More or less same as spotsReducer's get all spots
            const newState = { spot: {} }
            action.reviews.forEach(review => newState.spot[review.id] = review);
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            console.log('action = ', action.review.id)
            newState.spot[action.review.id] = action.review
            // console.log('888888 newState =', newState)

            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId];
            return newState;
        }
        default:
            return state;
    }

}

export default reviewReducer;
