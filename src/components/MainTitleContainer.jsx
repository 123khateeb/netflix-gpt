import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Info } from 'lucide-react';
import { Volume2 } from 'lucide-react';


const MainTitleContainer = ({ title, overview }) => {
    return (
        <>
        <div className=" flex items-start justify-end flex-col gap-3 absolute z-10 left-[4%] right-[4%] bottom-[18%] md:right-[50%] md:bottom-[20%] lg:right-[55%] lg:bottom-[22%] ">
            {/* Title */}
            <h1
                className="
                    font-bold leading-tight text-white
                    hidden
                    sm:block
                    text-[7vw]
                    sm:text-[5vw]
                    md:text-[3.5vw]
                    lg:text-[2.8vw]
                    xl:text-[2.2vw]
                "
            >
                {title}
            </h1>

            {/* Overview — mobile pe chhupa do, tablet+ pe dikhawo */}
            <p
                className="
                    text-white leading-snug
                    hidden
                    sm:block
                    sm:text-[2vw]
                    md:text-[1.5vw]
                    lg:text-[1.15vw]
                    xl:text-[1vw]
                    line-clamp-3
                "
            >
                {overview}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 mt-1">
                {/* Play Button */}
                <button
                    className="
                        flex items-center gap-2
                        bg-white hover:bg-[#ffffffbf]
                        text-black font-bold
                        rounded-[4px]
                        cursor-pointer
                        transition-colors duration-200
                        px-4 py-2
                        text-sm
                        sm:px-5 sm:py-2 sm:text-base
                        md:px-6 md:py-2.5 md:text-lg
                    "
                >
                    <FontAwesomeIcon icon={faPlay} />
                    Play
                </button>

                {/* More Info Button */}
                <button
                    className="
                        flex items-center gap-2
                        bg-[#6d6d6eb3] hover:bg-[#6d6d6e66]
                        text-white font-bold
                        rounded-[4px]
                        cursor-pointer
                        transition-colors duration-200
                        px-4 py-2
                        text-sm
                        sm:px-5 sm:py-2 sm:text-base
                        md:px-6 md:py-2.5 md:text-lg
                    "
                >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                    More Info
                </button>
            </div>
        </div>

        <div className='flex items-center gap-2 absolute z-10  right-[0%] bottom-[18%] md:right-[0%] md:bottom-[20%] lg:right-[0%] lg:bottom-[22%]'>
        <span className='p-2 border rounded-full'><Volume2 /></span>
        <span className='p-1 px-6 bg-[#6d6d6eb3] text-white border-l-2 ' style={{padding:".5vw 3.5vw .5vw .8vw",}}>U/A 13+</span>
        </div>
        </>
    );
};

export default MainTitleContainer;