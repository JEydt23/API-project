import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpot.css'

function CreateSpot({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validations, setValidations] = useState([]);
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState(false);


    useEffect(() => {
        const errors = [];
        if (!address || address.length > 30) errors.push("Address can't be empty and must be less than 30 characters.");
        if (!city || city.length > 20) errors.push("City cannot be empty and must be less than 20 characters.");
        if (!state || state.length > 20) errors.push("State can't be empty and must be shorter than 20 characters.")
        if (!country || country.length > 20) errors.push("Country can't be empty and must be shorter than 20 characters.")
        if (!name || name.length > 20) errors.push("Name can't be empty and must be shorter than 20 characters.")
        if (!description || description.length > 100) errors.push("Description can't be empty and must be shorter than 100 characters.")
        if (!price || price < 1) errors.push("Price can't be empty and must be greater than 0 dollars.")
        if (!url.match(/\.(gif|png|jpeg|jpg)$/)) errors.push("Image's url should use gif, png, jpeg or jpg format.");
        setValidations(errors)
    }, [address, city, state, country, name, description, price, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true);

        if (!validations.length) {
            const payload = {
                address, city, state, country, name, description, price, url
            }

            const newNew = await dispatch(createSpot(payload))
            newNew.SpotImages = [{url: url}]
            if(newNew){
                history.push(`/spots/${newNew.id}`)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a New Spot</h1>
            <ul className='errorsList'>
                {validations.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    min='1'
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <label>
                Image URL
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Become a Host</button>
        </form>

    );


}

export default CreateSpot;
