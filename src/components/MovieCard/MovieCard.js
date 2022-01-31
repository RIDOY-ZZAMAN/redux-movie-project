import React from 'react';
import './MovieCard.scss'

const MovieCard = ({ data }) => {
    const { Poster, Title, Year } = data;
    return (
        <div className="cart-item">
            <div className="card-inner">
                <div className="card-top">
                    <img src={Poster} alt={Title} />
                </div>
                <div className="card-bottom">
                    <div className="card-info">
                        <h4>{Title}</h4>
                        <p>{Year}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;