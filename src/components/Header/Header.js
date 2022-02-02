import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import user from '../../images/user.png';
import './Header.scss'

const Header = () => {

    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") {
            return alert("Please Insert a Movie or Shows Name")
        }

        if (term.toLowerCase().includes("sex") || term.toLowerCase().includes("erotic") || term.toLowerCase().includes("porn") || term.toLowerCase().includes("nude") || term.toLowerCase().includes("18+") || term.toLowerCase().includes("adult")) {
            return alert("Please don't search for the 18+ Movies or Show")
        }
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");


    }
    return (
        <div className='header'>

            <div className='logo'>
                <Link to="/">Movie App</Link>
            </div>

            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type="text" value={term} placeholder='Search for Movies or Shows' onChange={(e) => setTerm(e.target.value)} />
                    <button type='submit'> <i className='fa fa-search'></i></button>

                </form>

            </div>

            <div className="user-image">
                <img src={user} alt="" />

            </div>


        </div>
    );
};

export default Header;