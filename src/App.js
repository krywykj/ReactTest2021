import React, {createContext, useEffect} from 'react';
import { useLocalStore, useObserver} from "mobx-react";
import { getAllGenders } from "./utils/request";
import MovieList from "./Components/MovieList/MovieList";
import LeftMenu from "./Components/LeftMenu/LeftMenu";
import SearchBar from "./Components/SearchBar/SearchBar";
import "./style.css";


const StoreContext = createContext();

const StoreProvider = ({children})=> {

    const store = useLocalStore(() => ({
        choosedGender: "",
        choosedMovie: "",
        genres: [],
        movies: [],

        setGenders: genres => {
            store.genres = genres;
        },
        setMovies: movies => {
            store.movies = movies;
        },
        setChoosedGender: genre => {
            store.choosedGender = genre;
        },
        setChoosedMovie: movie => {
            store.choosedMovie = movie;
        },
        get genreCount(){
            return store.genres.length;
        }
    }));

    useEffect(() => {
        async function initData() {
            const allGenders = await getAllGenders();
            store.setGenders(allGenders);
        }
        initData();

    });

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default function App() {
  return (

      <StoreProvider>
          <main>
              <SearchBar StoreContext={StoreContext}/>
              <div className={"mainContent"}>
                  <LeftMenu StoreContext={StoreContext}/>
                  <MovieList StoreContext={StoreContext}/>
              </div>
          </main>
      </StoreProvider>
  );
}