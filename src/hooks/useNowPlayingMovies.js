import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constant'

const useNowPlayingMovies = () =>{

    const dispatch = useDispatch();
    
    const getNowPlayingMovies = async() =>{
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addNowPlayingMovies(jsonData))
    }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
}

export default useNowPlayingMovies;