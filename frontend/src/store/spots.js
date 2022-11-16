import { csrfFetch } from './csrf'

const GET_ALL_SPOTS = 'spots/GetAllSpots';
const GET_SPOT_DETAILS = 'spots/GetSpotDetails'
const CREATE_SPOT = 'spots/CreateSpot'
const EDIT_SPOT = 'spots/EditSpot'
const DELETE_SPOT = 'spots/DeleteSpot'

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

// GET ONE SPOT DETAILS ACTION CREATOR

const spotDetailsAction = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

// EDIT SPOT ACTION CREATOR

const editSpotAction = (spot) => {
    return {
        type: EDIT_SPOT,
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

        dispatch(allSpotsAction(spots));

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
    const { url } = addSpot;
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addSpot)
    })

    if (response.ok) {
        const spot = await response.json();
        const image = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, preview: true })
        })

        if (image.ok) {
            const imageR = await image.json();
            spot.SpotImages = [imageR]
            dispatch(createSpotAction(spot));
            return spot
        }
    }
}

// EDIT SPOT THUNK

export const editSpotThunk = (payload, spotId) => async (dispatch) => {
    // console.log(`########## spot`, payload.spotId)
    // console.log('&&&&&&&&&&&&&&&& id', spotId)
    const response = await csrfFetch(`/api/spots/${payload.spotId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spotData = await response.json();
        console.log(spotData)
        dispatch(editSpotAction(spotData))
        return spotData;
    }
}

// DELETE SPOT THUNK

export const deleteSpot = (spotId) => async (dispatch) => {

    // const { id } = spotId;
    // console.log('~~~~~~ SPOT ID ~~~~~~', spotId)
    // console.log('~~~~~~~~ID', spotId.spotId)
    // console.log('=====spotId====', spotId)
    const response = await csrfFetch(`/api/spots/${spotId.spotId}`, {
        method: 'DELETE'
    })
    // console.log(response)
    if (response.ok) {
        // (console.log('~~~~~~~delete hit~~~~~~', spotId))
        // const data = await response.json();
        dispatch(deleteSpotAction(spotId.spotId));
        // return data;
    }
}

// SPOT REDUCER

const spotsReducer = (state = { viewAllSpots: {}, viewSingleSpot: {} }, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SPOTS:
            action.spots.Spots.forEach(spot => newState.viewAllSpots[spot.id] = spot);
            return newState;
        case GET_SPOT_DETAILS:
            newState.viewSingleSpot = action.spot
            return newState;
        case CREATE_SPOT:
            newState.viewSingleSpot = action.spot;
            return newState;
        case EDIT_SPOT:
            newState.viewSingleSpot = action.spot.spotId;
            return newState;
        case DELETE_SPOT:
            delete newState[action.spot.spotId.spotId];
            return newState;
        default:
            return state;
    }

}

export default spotsReducer;
