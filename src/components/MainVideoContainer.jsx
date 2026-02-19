import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MainVideoContainer = ({ movieId, backdropPath }) => {
  const trailerVideo = useSelector((store) => store.movies?.TrailerVideo);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useMovieTrailer({ movieId });

  useEffect(() => {
    if (trailerVideo?.key) {
      // 2 second buffer taaki quality adjust ho jaye background me
      const timer = setTimeout(() => {
        setIsVideoReady(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trailerVideo]);

  return (
    // OUTER CONTAINER
    // Mobile: 'aspect-video' (16:9 box) -> Height auto adjust hogi width ke hisaab se.
    // Desktop: 'h-screen' (Full viewport height) -> Immersive background.
    <div className="relative w-full aspect-video md:h-screen md:aspect-auto bg-black overflow-hidden">
      
      {/* 1. BACKDROP IMAGE (High Quality Fallback) */}
      {!isVideoReady && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <img 
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
            alt="Movie Backdrop"
          />
        </div>
      )}

      {/* 2. YOUTUBE VIDEO */}
      {trailerVideo?.key && (
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <iframe
            className={`
              absolute top-0 left-0 w-full h-full
              
              /* MOBILE SCALING (The Fix for Black Borders) */
              /* Hum 1.25x scale kar rahe hain taaki halki si black borders cut jayein */
              scale-[1.25] 
              
              /* DESKTOP SCALING (The Fix for Full Screen) */
              /* Desktop par center karke aspect ratio maintain karte hue zoom karenge */
              md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
              md:w-[100vw] md:h-[56.25vw] 
              md:min-h-screen md:min-w-[177.77vh]
              md:scale-[1.35]

              pointer-events-none select-none
              transition-opacity duration-1000 ease-in-out
              ${isVideoReady ? "opacity-100" : "opacity-0"} 
            `}
            // Note: &vq=hd1080 aur &vq=large dono use kiya hai safety ke liye
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=${trailerVideo.key}&vq=hd1080`}
            title="Netflix Hero Video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            loading="eager"
          ></iframe>
        </div>
      )}

      

    </div>
  );
};

export default MainVideoContainer;