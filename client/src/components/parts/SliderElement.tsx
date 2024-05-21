import { FC } from "react";
import SolidLink from "../buttons/SolidLink";
import Rating from "./Rating";

interface Props {
    id: number;
    title: string;
    year: string;
    rating: string;
    activeId: number;
    handleActiveId: (id: number) => void
    image: string
}

const SliderElement: FC<Props> = ({id, title, year, rating, activeId, handleActiveId, image}) => {
    const handleClick = (id: number) => {
        handleActiveId(id);
    }

    return <>
        <div className={`${activeId === id ? "min-w-[945px] h-auto" : "max-w-[115px]"} bg-light-gray relative flex justify-center max-h-[485px] rounded-xl overflow-hidden cursor-pointer w-full`} 
                        onClick={() => handleClick(id)}>
            <div className="relative w-full h-full">
                <img src={`http://localhost:3000/${image}`} alt={image} className="w-full h-full object-cover"/>
            </div>
            {activeId === id && (
                <div className="absolute bottom-0 left-0 w-full bg-dark-gray/75 py-6 px-9 flex items-center">
                    <div className="flex-1 flex flex-col gap-2.5">
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <span className="font-bold text-light-yellow">{year}</span>
                        <Rating rating={rating}/>
                    </div>
                    <SolidLink path={`/movie-details/${id}`}>Details</SolidLink>
                </div>
            )}
        </div>
    </>
}

export default SliderElement;