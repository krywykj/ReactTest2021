import React from 'react';
import axios from "axios";
import {API_KEY, URL} from "./variables";

export async function getAllGenders () {
    let params = {
        params:{ api_key:API_KEY }
    }
    let response = await axios.get(URL + '/genre/movie/list', params)
        .then(res => res.data.genres)
        .catch(err => console.log(err))
    return response
}

export async function getMoviesByGender (genreId) {
    //https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=90a939768ebe4b5bd52c2b412895e05e
    let params = {
        params:{
            api_key:API_KEY,
            with_genres:genreId,
            sort_by:'popularity.desc',
            include_video:true,
        },
    }

    let response = await axios.get(URL + '/discover/movie', params)
        .then(res => res.data.results)
        .catch(err => console.log(err))
    return response
}

export async function getSearchMovie(query) {
    //https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=90a939768ebe4b5bd52c2b412895e05e
    let params = {
        params:{
            api_key:API_KEY,
            query:encodeURI(query),
        },
    }

    let response = await axios.get(URL + '/search/movie', params)
        .then(res => res.data.results)
        .catch(err => console.log(err))
    return response
}

export async function getVideoFromIdMovie(idMovie) {
    //https://api.themoviedb.org/3/movie/297762?api_key=90a939768ebe4b5bd52c2b412895e05e&append_to_response=videos
    let params = {
        params:{
            api_key:API_KEY,
            append_to_response:"videos"
        },
    }
    //let response = await axios.get(URL + `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${API_KEY}&append_to_response=videos`)
    let response = await axios.get(URL + `/movie/${idMovie}`, params)
        .then(res => res.data.videos.results[0].key)
        .catch(err => console.log(err))
    return response
}