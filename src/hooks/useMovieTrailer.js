import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constant';

const useMovieTrailer = ({ movieId }) => {
    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos`,
                API_OPTIONS
            );
            const json = await response.json();

            if (!json.results || json.results.length === 0) return;

            const filterTrailer = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];

            dispatch(addTrailerVideo(trailer));
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    useEffect(() => {
        if (movieId) {
            getMovieTrailer();
        }
    }, [movieId]);
};

export default useMovieTrailer;