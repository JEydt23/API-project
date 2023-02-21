import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { editSpotThunk } from '../../store/spots';
import './EditSpotForm.css'

function EditSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const updateThisSpot = useSelector(state => state.spot.viewSingleSpot)
    const { spotId } = useParams();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validations, setValidations] = useState([]);
    const [showErrors, setShowErrors] = useState(false)
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const [errors, setErrors] = useState(false);
    // console.log(updateThisSpot)

    useEffect(() => {
        const errors = [];
        if (!address || address.length > 30) errors.push("Address can't be empty and must be less than 30 characters.");
        if (address?.trim() == '') errors.push("Letters or numbers are required in the address.")
        if (!city || city.length > 20) errors.push("City cannot be empty and must be less than 20 characters.");
        if (city?.trim() == '') errors.push("Letters or numbers are required in the city.")
        if (!state || state.length > 20) errors.push("State can't be empty and must be shorter than 20 characters.")
        if (state?.trim() == '') errors.push("Letters or numbers are required in the state.")
        if (!country || country.length > 20) errors.push("Country can't be empty and must be shorter than 20 characters.")
        if (country?.trim() == '') errors.push("Letters or numbers are required in the country.")
        if (!name || name.length > 20) errors.push("Name can't be empty and must be shorter than 20 characters.")
        if (name?.trim() == '') errors.push("Letters or numbers are required in the name.")
        if (!description || description.length > 255) errors.push("Description can't be empty and must be shorter than 255 characters.")
        if (description?.trim() == '') errors.push("Letters or numbers are required in the description.")
        if (!price || price < 1) errors.push("Price can't be empty and must be greater than 0 dollars.")
        if (!lat || lat > 90 || lat < -90) errors.push("Latitude is required and must be less than 90 degrees or more than -90 degrees.")
        if (!lng || lng > 180 || lng < -180) errors.push("Longitude is required and must be less than 180 degrees or more than -180 degrees.")

        setValidations(errors)
    }, [address, city, state, country, name, description, price, lng, lat]);

    useEffect(() => {
        setAddress(updateThisSpot?.address);
        setCity(updateThisSpot?.city);
        setState(updateThisSpot?.state);
        setCountry(updateThisSpot?.country);
        setName(updateThisSpot?.name);
        setDescription(updateThisSpot?.description);
        setPrice(updateThisSpot?.price);
    }, [updateThisSpot])

    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault();
        setErrors(true);

        if (!validations.length) {
            const payload = {
                address, city, state, country, name, description, price, spotId, lng, lat
            }
            // console.log("payload:::::::::::::::", payload)
            const updated = await dispatch(editSpotThunk(payload))
            if (updated) {
                await history.push(`/spots/${spotId}`)
            }
        }
    }

    return (
        <div className='create-a-spot-main'>
            <form onSubmit={handleSubmit}>
                <div className='create-spot'>
                    <h1>Edit Spot Information</h1>
                </div>
                <div className='ul-create-spot'>
                    <ul className='errorsList'>
                        { showErrors ?
                        validations.map((error, idx) => <li className='create-spot-errors' style={{color: 'red'}} key={idx}>{error}</li>): null}
                    </ul>
                </div>
                <div className='create-spot-label'>
                    <label className='create-spot'>
                        {/* Address */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder={'Updated Address'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Address */}
                        <input className='create-spot-input'
                            type="number"
                            placeholder='Updated Latitude'
                            value={lat}
                            min='-90'
                            max='90'
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Address */}
                        <input className='create-spot-input'
                            type="number"
                            placeholder='Updated Longitude'
                            value={lng}
                            min='-180'
                            max='180'
                            onChange={(e) => setLng(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* City */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Updated City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* State  */}
                        <input className='create-spot-input'
                            type="text"
                            value={state}
                            placeholder='Updated State'
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Country */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Updated Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Name */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Updated Name of Location'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Description */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Updated Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Price */}
                        <input className='create-spot-input'
                            type="number"
                            placeholder='Updated Price in USD'
                            value={price}
                            min='1'
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button id='create-submit-spot' type="submit">Save Changes</button>
            </form>

        </div>
    );


}

export default EditSpot;
