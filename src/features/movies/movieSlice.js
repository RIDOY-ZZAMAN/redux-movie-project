import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {

    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`)
        .catch((err) => {
            console.log("Error is", err);

        })

    return response.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {

    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=series`)
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
    selecteMovieOrShow: {},
    loading: false

}


const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        removeSelectedMovieOrShow: (state) => {
            state.selecteMovieOrShow = {}
        },
    },

    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            console.log("Pending");
            return { ...state, loading: true }
        },

        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, movies: payload, lodaing: false }
        },

        [fetchAsyncMovies.rejected]: (state) => {
            console.log("Rejected");
            return { ...state, loading: false }

        },

        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, shows: payload, loading: false }
        },

        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("fetched successfully");
            return { ...state, selecteMovieOrShow: payload, loading: false }
        },


    }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selecteMovieOrShow;
export const getLoading = (state) => state.movies.loading;
export default movieSlice.reducer;