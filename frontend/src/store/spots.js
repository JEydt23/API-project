const GET_ALL_SPOTS = 'spots/GetAllSpots';

// *****ACTION CREATOR ******

// GET ALL SPOTS ACTION CREATOR

const allSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
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

// SPOT REDUCER

const spotsReducer = (state = { viewAllSpots: {}, viewSingleSpot: null }, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_ALL_SPOTS:
            // console.log(action.spots.Spots)
            action.spots.Spots.forEach(spot => newState.viewAllSpots[spot.id] = spot);
            return newState;
        default:
            return state;
    }

}

export default spotsReducer;
