import { FC } from "react";
import SolidLink from "../buttons/SolidLink";

interface Props {
    id: number;
    title: string;
    activeEl: number;
    description: string;
    genres: any[];
    image: string;
    index: number;
}

const SliderElement: FC<Props> = ({id, title, description, activeEl, image, index, genres}) => {

    return (
        <div className="w-full h-full absolute transition-transform duration-500" style={{ transform: `${activeEl === index ? "translateX(0)" : "translateX(200%)"}` }}>
            <div className="w-full h-full overflow-hidden rounded-xl">
                <img src={`http://localhost:3000/${image}`} alt={image} className="object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col justify-between absolute top-0 left-0 h-full p-3 w-full">
                <div className="flex gap-6">
                    {genres.map(genre => (
                        <span key={genre.title} className="px-3 py-1 bg-light-gray/75 rounded-xl">{genre.title}</span>
                    ))}
                </div>
                <div className="flex flex-col gap-6 items-start">
                    <div className="flex flex-col gap-6 bg-light-gray/75 px-3 py-2 rounded-xl flex-wrap max-w-[50%]">
                        <h3 className="font-bold uppercase text-xl text-light-yellow">{title}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="flex">
                        <SolidLink path={`/movie-details/${id}`}>Details</SolidLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderElement;