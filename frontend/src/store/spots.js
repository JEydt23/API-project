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
        // console.log("spot ====", spot)
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

// !!spotId is passed in through payload in EditSpotForm index!!
export const editSpotThunk = (payload) => async (dispatch) => {
    // console.log(`########## spot`, payload.spotId)
    // console.log('&&&&&&&&&&&&&&&& id', spotId)
    const response = await csrfFetch(`/api/spots/${payload.spotId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spotData = await response.json();
        // console.log(spotData)
        dispatch(editSpotAction(spotData))
        return spotData;
    }
}

// DELETE SPOT THUNK

// !!CAN ONLY DELETE SPOTS IF CURRENT USER OWNS THEM!!
export const deleteSpot = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {

        dispatch(deleteSpotAction(spotId));

    }
}

// SPOT REDUCER

const spotsReducer = (state = { viewAllSpots: {}, viewSingleSpot: {} }, action) => {

    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { viewAllSpots: {}, viewSingleSpot: {} }
            action.spots.Spots.forEach(spot => newState.viewAllSpots[spot.id] = spot);
            return newState;
        }
        case GET_SPOT_DETAILS: {
            const newState = { viewAllSpots: {}, viewSingleSpot: {} }
            newState.viewSingleSpot = action.spot
            newState.viewAllSpots = {...state.viewAllSpots}
            return newState;

        }
        case CREATE_SPOT: {
            const newState = { ...state, viewAllSpots: { ...state.viewAllSpots }, viewSingleSpot: { ...state.viewSingleSpot } }
            newState.viewSingleSpot = action.spot;
            return newState;

        }
        case EDIT_SPOT: {
            const newState = { ...state, viewAllSpots: { ...state.viewAllSpots }, viewSingleSpot: { ...state.viewSingleSpot } }
            newState.viewSingleSpot = action.spot.spotId;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state, viewAllSpots: { ...state.viewAllSpots }, viewSingleSpot: { ...state.viewSingleSpot } }
            delete newState.viewAllSpots[action.id];
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
