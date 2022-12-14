import { NavLink } from "react-router-dom";
import './AllSpots.css'



const AllSpots = ({ spot }) => {


let starRating;
if (spot.avgRating){
    starRating = `★ ${spot.avgRating}`
} else {
    starRating = `☆ 0`
}


    return (
        <div className="spots" >
            <div className="previewImage">
                <NavLink to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name} id='spotImage'></img>
                </NavLink>
            </div>
            <div className="spots-info" >
                <div id="city-country-stars">
                    <div id='city-country'>
                        {spot.city}, {spot.country}
                    </div>
                    <div id='avgRating'>
                        {starRating}
                    </div>
                </div>
            </div>
            <div className="allSpots-name">
                {spot.name}
            </div>
            <div id='price'>${spot.price}
                <span id='night'> night</span>

            </div>

        </div>


    )

}

export default AllSpots;






















// import { NavLink } from "react-router-dom";

// const AllSpots = ({ spot }) => {
//     return (
//         <div className='spotsSeconddiv' style={{ border: '2px solid green' }}>
//             <div id='imageNav'>
//                 <NavLink to='/'>
//                     {/* <img id='spotimage' alt={spot.name} src={spot.previewImage}></img> */}
//                 </NavLink>
//             </div>
//             <div className="priceAndStardiv">
//                 <div>
//                     <div>{spot.city},{spot.country}</div>
//                     <div>${spot.price}/Night</div>
//                 </div>
//                 <div>{spot.avgRating}</div>
//             </div>
//         </div >
//     )
// }

// export default AllSpots;
