import { NavLink } from "react-router-dom";
import './AllSpots.css'



const AllSpots = ({ spot }) => {
    // console.log(spot)
    return (
        <div className="spots" >
            <div className="previewImage">
                <NavLink to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name} id='spotImage'></img>
                </NavLink>
            </div>
            <div className="spots-info" /*style={{border: '2px solid black'}}*/>
                <div id="city-country">{spot.city}, {spot.country}
                    <span id='avgRating'> ★{spot.avgRating}</span>
                </div>
                <div id='price'>${spot.price}
                    <span id='night'> night</span>

                </div>

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
