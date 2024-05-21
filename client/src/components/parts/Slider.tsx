import { FC, useState } from "react"
import { IMovie } from "../../types/types";
import SliderElement from "./SliderElement";

interface Props {
    initialActive: number;
    movies: IMovie[];
}

const Slider: FC<Props> = ({initialActive, movies}) => {
    const [activeElement, setActiveElement] = useState(initialActive);

    return <div className="flex gap-6 justify-center">
        {movies.map(movie => (
            <SliderElement activeId={activeElement} handleActiveId={setActiveElement} id={movie.id} rating={movie.rating} title={movie.title} year={movie.release} key={movie.id} image={movie.images[0]}/>
        ))}
    </div>
}

export default Slider