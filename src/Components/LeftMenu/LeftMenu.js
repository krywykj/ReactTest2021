import {getMoviesByGender} from "../../utils/request";
import {useObserver} from "mobx-react";
import React, {Fragment, useContext} from 'react';

const LeftMenu = ({StoreContext}) => {
    const store = useContext(StoreContext);

    const handleClick = async (genreId) => {
        store.setChoosedGender(genreId);
        const allMovies = await getMoviesByGender(genreId);
        store.setMovies(allMovies);
    }

    const styleLeftMenu = {
        backgroundColor:'#f2f2f2',
        width:'200px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        border:"1px solid black"
    }

    return useObserver(() => (
        <div style={styleLeftMenu}>
            {store.genres.map(genre =>

                <div onClick={() => handleClick(genre.id)}
                     className={"genreHover"}
                    key={genre.id}>
                    {genre.name}
                </div>
            )}
        </div>
    ));
};

export default LeftMenu;
