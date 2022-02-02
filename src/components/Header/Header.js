import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import user from '../../images/user.png';
import './Header.scss';
import Swal from 'sweetalert2'

const Header = () => {

    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") {
            return Swal.fire({
                title: 'Error!',
                text: "Please Insert a Movie or Show Name",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        if (term.toLowerCase().includes("sex") || term.toLowerCase().includes("sexy") || term.toLowerCase().includes("sex movie") || term.toLowerCase().includes("erotic") || term.toLowerCase().includes("porn") || term.toLowerCase().includes("nude") || term.toLowerCase().includes("18+") || term.toLowerCase().includes("adult")) {
            return Swal.fire({
                title: 'Forbidden!',
                text: "Please Don't Search for 18+ Movies or Shows",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");


    }
    return (
        <div className='header'>

            <div className='logo'>
                <Link to="/">Movie Wiki</Link>
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