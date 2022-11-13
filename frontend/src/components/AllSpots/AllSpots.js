import { NavLink } from "react-router-dom";

const AllSpots = ({ spot }) => {
// console.log(spot)
    return (
        <div>
            <div style={{ border: '10px solid black' }}>
                <h1>ALL SPOTS</h1>
            </div>
            <div className="allSpots" >
                <h2>Images should be here</h2>
                <NavLink to='/'>
                    <img src={spot.previewImage} alt={spot.name} id='spotImage'></img>
                </NavLink>
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
