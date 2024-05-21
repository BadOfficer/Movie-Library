import { FC } from "react";
import { FaStar } from "react-icons/fa";

interface Props {
    rating: string;
}

const Rating: FC<Props> = ({rating}) => {
    return <div className="flex gap-2.5 items-center">
            <FaStar className="text-light-yellow"/>
            <span>{rating}</span>
        </div>
}

export default Rating;