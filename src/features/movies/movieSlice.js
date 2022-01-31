import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const movieText = "Harry"
    const response = await movieApi.get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
        .catch((err) => {
            console.log("Error is", err);

        })

    return response.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesText = "Friends"
    const response = await movieApi.get(`?apikey=${APIKey}&s=${seriesText}&type=series`)
        .catch((err) => {
            console.log("Error is", err);

        })

    return response.data
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`)
        .catch((err) => {
            console.log("Error is", err);

        })

    return response.data
})


export const initialState = {
    movies: {},
    shows: {},
    selecteMovieOrShow: {}

}


const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        }
    },

    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },

        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, movies: payload }
        },

        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");

        },

        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, shows: payload }
        },

        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, selecteMovieOrShow: payload }
        },


    }
})

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selecteMovieOrShow;
export default movieSlice.reducer;