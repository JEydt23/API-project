import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpot.css'

function CreateSpot({ spot }) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validations, setValidations] = useState([]);
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false)



    useEffect(() => {
        const errors = [];
        // if (!sessionUser) errors.push('You must be logged in to host a location.')
        if (!address || address.length > 30) errors.push("Address can't be empty and must be less than 30 characters.");
        if (address.trim() == '') errors.push("Letters or numbers are required in the address.")
        if (!city || city.length > 20) errors.push("City cannot be empty and must be less than 20 characters.");
        if (city.trim() == '') errors.push("Letters or numbers are required in the city.")
        if (!state || state.length > 20) errors.push("State can't be empty and must be shorter than 20 characters.")
        if (state.trim() == '') errors.push("Letters or numbers are required in the state.")
        if (!country || country.length > 20) errors.push("Country can't be empty and must be shorter than 20 characters.")
        if (country.trim() == '') errors.push("Letters or numbers are required in the country.")
        if (!name || name.length > 20) errors.push("Name can't be empty and must be shorter than 20 characters.")
        if (name.trim() == '') errors.push("Letters or numbers are required in the name.")
        if (!description || description.length > 255) errors.push("Description can't be empty and must be shorter than 255 characters.")
        if (description.trim() == '') errors.push("Letters or numbers are required in the description.")
        if (!price || price < 1) errors.push("Price can't be empty and must be greater than 0 dollars.")
        if (!url.match(/\.(gif|png|jpeg|jpg)$/)) errors.push("Image's url should use gif, png, jpeg or jpg format.");
        if (!lat || lat > 90 || lat < -90) errors.push("Latitude is required and must be less than 90 degrees or more than -90 degrees.")
        if (!lng || lng > 180 || lng < -180) errors.push("Longitude is required and must be less than 180 degrees or more than -180 degrees.")
        setValidations(errors)
    }, [address, city, state, country, name, description, price, url, lat, lng]);

    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault();
        setErrors(true);

        if (!sessionUser) {
            alert('You must be logged in to create a spot.')
        }
        if (!validations.length) {
            const payload = {
                address, city, state, country, name, description, price, url, lat, lng
            }

            const newNew = await dispatch(createSpot(payload))
            newNew.SpotImages = [{ url: url }]
            if (newNew) {
                history.push(`/spots/${newNew.id}`)
            }
        }
    }

    return (
        <div className='create-a-spot-main'>
            <form onSubmit={handleSubmit}>
                <div className='create-spot'>
                    <h1>Create a New Spot</h1>
                </div>
                <div className='ul-create-spot'>

                    <ul className='errorsList'>
                    {
                        showErrors ?
                        validations.map((error, idx) => <li style={{color: 'red'}} className='create-spot-errors' key={idx}>{error}</li>)
                        : null}
                    </ul>
                </div>
                <div className='create-spot-label'>
                    <label className='create-spot'>
                        {/* Address */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Address */}
                        <input className='create-spot-input'
                            type="number"
                            placeholder='Latitude'
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
                            placeholder='Longitude'
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
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* State */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Country */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Name */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Name of location/property'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Description */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Description of residence'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Price */}
                        <input className='create-spot-input'
                            type="number"
                            value={price}
                            placeholder='Price per night in USD'
                            min='1'
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <label className='create-spot'>
                        {/* Image URL */}
                        <input className='create-spot-input'
                            type="text"
                            placeholder='Photo URL of residence'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button id='create-submit-spot' type="submit">Become a Host</button>

            </form>
        </div>
    );


}

export default CreateSpot;
