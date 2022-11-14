const GET_ALL_SPOTS = 'spots/GetAllSpots';
const GET_SPOT_DETAILS = 'spots/GetSpotDetails'

// *****ACTION CREATOR ******

// GET ALL SPOTS ACTION CREATOR

const allSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// GET ONE SPOT DETAILS

const spotDetailsAction = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
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
        default:
            return state;
    }

}

export default spotsReducer;
