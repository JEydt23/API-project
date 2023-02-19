import { Fragment, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import './SearchBar.css'


function SearchBar() {

    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spot.viewAllSpots))
    const [results, setResults] = useState([])
    const [search, setSearch] = useState()
    const [close, setClose] = useState(false)

    useEffect(() => {
        if (!spots.length) {
            dispatch(getAllSpots())
        }
    }, [dispatch, spots.length])

    useEffect(() => {
        const clicked = () => (setClose(true))
        window.addEventListener('click', clicked)
    })

    const searchFilter = (e) => {
        const search = e.target.value
        setSearch(search)
        setClose(false)
        const filter = spots.filter(spot => {
            return spot.name.toLowerCase().includes(search.toLowerCase()) ||
                spot.city.toLowerCase().includes(search.toLowerCase()) ||
                spot.country.toLowerCase().includes(search.toLowerCase()) ||
                spot.state.toLowerCase().includes(search.toLowerCase())
        })
        if (!search) {
            setResults()
        } else {
            setResults(filter.splice(0, 5))
        }

    }


    const closeSearch = (e) => {
        e.preventDefault()
        setSearch("")
        setResults()
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                className="searchInput"
                onChange={searchFilter}
                value={search}
                placeholder="🔍 Search for a place to stay"
            >
            </input>
            <div>
            </div>
            <div className="search-results">
                {!close && results && (
                    <Fragment>
                        {results.map((result, idx) =>
                            <div onClick={closeSearch}>
                                {/* {console.log("result ==== ", result, "idx ==== ", idx)} */}
                                <NavLink key={idx} to={`/spots/${result.id}`}>
                                    <img src={result.previewImage} />
                                    <div>{result.name} in {result.city}, {result.state}</div>


                                </NavLink>
                            </div>
                        )}
                    </ Fragment>
                )}

            </div>

        </div>
    )
}

export default SearchBar
