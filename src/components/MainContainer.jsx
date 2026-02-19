import { useSelector } from "react-redux";
import MainVideoContainer from "./MainVideoContainer";
import MainTitleContainer from "./MainTitleContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies?.results?.length) return null;

  const mainMovie = movies.results[0];
  const { title, overview, id, backdrop_path } = mainMovie;

  return (
    <div className="w-full h-[25svh] md:h-screen relative bg-black overflow-hidden">
      <MainVideoContainer movieId={id} backdropPath={backdrop_path} />
      <MainTitleContainer title={title} overview={overview} />
    </div>
  );
};

export default MainContainer;
