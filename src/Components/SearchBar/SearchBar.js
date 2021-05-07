import React, {useContext, useState} from 'react';
import {useObserver} from "mobx-react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {getSearchMovie} from "../../utils/request";


const SearchBar = () => {
    const [movies, setMovies] = useState("");

    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        let moviesSearched = await getSearchMovie(string);
        setMovies(moviesSearched.map(({title,...rest}) => ({name:title,title:title,...rest})))
    }


    const handleOnSelect = (item) => {
        // TODO : Once the search movie is selected, show the pop-in

    }


    return useObserver( () =>
        (
            <div className={"searchContent"}>
                <div className={"logo"}>ALLOCINE COPY 😺 <br/> by JK 07/05/2021</div>
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={movies}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                    />
                </div>
            </div>
        ))
}

export default SearchBar;
