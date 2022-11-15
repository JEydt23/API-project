import { csrfFetch } from './csrf'

const GET_ALL_SPOTS = 'spots/GetAllSpots';
const GET_SPOT_DETAILS = 'spots/GetSpotDetails'
const CREATE_SPOT = 'spots/CreateSpot'
const DELETE_SPOT = 'spots/DeleteSpot'
const ADD_IMAGE_SPOT = 'spots/AddImageSpot'

// *****ACTION CREATOR ******

// GET ALL SPOTS ACTION CREATOR

const allSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// CREATE A SPOT ACTION CREATOR

const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

// ADD IMAGE TO SPOT ACTION CREATOR

const addImageAction = (image) => {
    return {
        type: ADD_IMAGE_SPOT,
        image
    }
}

// GET ONE SPOT DETAILS ACTION CREATOR

const spotDetailsAction = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

// DELETE SPOT ACTION CREATOR

const deleteSpotAction = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

// *****THUNKS*******

// GET ALL SPOTS THUNK

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        // console.log(spots)
        dispatch(allSpotsAction(spots));
        // console.log(spots)
        // return spots;
    }
}

// GET ONE SPOT THUNK

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(spotDetailsAction(spot));

    }
}

// CREATE SPOT THUNK

export const createSpot = (addSpot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addSpot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpotAction(spot));
        // let imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(image)
        // })
        // if (imageResponse.ok) {
        // }
        // const images = await imageResponse.json();
        // console.log()

        // if (response.ok && imageResponse.ok) {
        //     dispatch(createSpotAction(spot))
        //     dispatch(spotImageAction(images));

        //     spot.previewImages = images;
        // }

    }
}

// ADD IMAGE THUNK

export const spotImageAction = (image, spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
    })
    if (response.ok) {
        const imageResponse = await response.json();
        dispatch(addImageAction(imageResponse));
        // response.previewImage = imageResponse
    }
}


// DELETE SPOT THUNK

export const deleteSpot = (id) => async (dispatch) => {
    console.log('~~~~~~ SPOT ID ~~~~~~', id)
    
    const { spotId } = id;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    console.log()
    if (response.ok) {
        (console.log('~~~~~~~delete hit~~~~~~', spotId))
        const data = await response.json();
        dispatch(deleteSpotAction(spotId));
        return data;
    }
}

// SPOT REDUCER

const spotsReducer = (state = { viewAllSpots: {}, viewSingleSpot: {} }, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SPOTS:
            // console.log(action.spots.Spots)
            action.spots.Spots.forEach(spot => newState.viewAllSpots[spot.id] = spot);
            return newState;
        case GET_SPOT_DETAILS:
            newState.viewSingleSpot = action.spot
            return newState;
        case CREATE_SPOT:
            newState.viewSingleSpot = action.spot;
            return newState;
        case ADD_IMAGE_SPOT:
            newState.viewSingleSpot = action.image;
            return newState;
        case DELETE_SPOT:
            delete newState[action.spot.id];

            return newState;
        default:
            return state;
    }

}

export default spotsReducer;
