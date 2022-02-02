import React from 'react';
import { useSelector } from 'react-redux'
import { getAllMovies, getAllShows, getLoading } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss';
import Slider from "react-slick";
import { Oval } from 'react-loader-spinner';


import { Settings } from '../../common/settings';
const MovieListing = () => {

    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    const loading = useSelector(getLoading)

    let renderMovies, renderShows = "";
    renderMovies = movies.Response === "True" ? (movies.Search.map((movie, index) => <MovieCard
        key={index}
        data={movie}
    >
    </MovieCard>
    )

    ) : (

        <div className="movies-error">
            <h3>{movies.Error}</h3>

        </div>
    );

    renderShows = shows.Response === "True" ? (shows.Search.map((show, index) => <MovieCard
        key={index}
        data={show}
    >
    </MovieCard>
    )

    ) : (

        <div className="movies-error">
            <h3>{shows.Error}</h3>

        </div>
    );

    return (
        <>
            {
                loading ? <div className='home-spinner'>
                    <Oval
                        heigth="100"
                        width="100"
                        color='grey'
                        ariaLabel='loading'


                    />


                </div>
                    :
                    (<div className="movie-wrapper">
                        <div className="movie-list">
                            <h2> Movies  </h2>
                            <div className="movie-container">
                                <Slider {...Settings}> {renderMovies}</Slider>

                            </div>
                        </div>

                        <div className="show-list">
                            <h2> Shows  </h2>
                            <div className="movie-container">
                                <Slider {...Settings}>  {renderShows}</Slider>
                            </div>
                        </div>
                    </div>)
            }
        </>
    );
};

export default MovieListing;