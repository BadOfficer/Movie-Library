import { FC, useState, useEffect } from "react";
import { IMovie } from "../../types/types";
import SliderElement from "./SliderElement";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    initialActive: number;
    movies: IMovie[];
}

const Slider: FC<Props> = ({ initialActive, movies }) => {
    const [activeElement, setActiveElement] = useState(initialActive);
    
    const handleNext = () => {
        setActiveElement((prev) => (prev + 1) % movies.length);
    };

    const handlePrev = () => {
        setActiveElement((prev) => (prev - 1 + movies.length) % movies.length);
    };    

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000);

        return () => clearInterval(interval);
    }, [activeElement]);
    
    return (
        <div className="w-full relative h-96 overflow-hidden flex p-3 lg:p-0">
            <div className="relative w-full h-full">
                {movies.map((movie, index) => (
                    <SliderElement key={movie.id} title={movie.title} index={index} activeEl={activeElement} description={movie.description} 
                                    genres={movie.genres} id={movie.id} image={movie.images[0]} />
                ))}
            </div>
            <div className="absolute bottom-0 right-0 flex gap-6 p-6 lg:p-3">
                <ArrowButton handleClick={handlePrev}>
                    <MdKeyboardArrowLeft size={20}/>
                </ArrowButton>
                <ArrowButton handleClick={handleNext}>
                    <MdKeyboardArrowRight size={20}/>
                </ArrowButton>
            </div>
        </div>
    );
};

export default Slider;
