import {useObserver} from "mobx-react";
import React, {useState, useContext, useRef} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { URL_IMG} from "../../utils/variables";
import {getVideoFromIdMovie} from "../../utils/request";

const MovieList = ({StoreContext}) => {
    const store = useContext(StoreContext);

    const handleMovieClick = async (movieId) => {
        store.setChoosedMovie(movieId);
        const movieInfos = await getVideoFromIdMovie(movieId);
        window.open("https://www.youtube.com/watch?v="+movieInfos, "_blank");
    }

    return useObserver(() => (
            <div className={"moviesContent"}>
                {store.movies.map(movie=>
                    <div>
                        <Popup
                            trigger={
                            <div onClick={() => handleMovieClick(movie.id)}
                                className={'movie'}>
                                {movie.title}
                            </div>

                        } position="right center">
                            <div className={"textCenter"}>
                                <img onClick={() => handleMovieClick(movie.id)}
                                    src={URL_IMG + movie.poster_path}
                                    width="100%"/>

                                <h3>{movie.title}</h3>
                                <p className={"movieDescription"}>{movie.overview}</p>
                            </div>
                        </Popup>

                    </div>)}
            </div>
    ));
};

export default MovieList;
