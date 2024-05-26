import { FC } from "react";
import { BiFilterAlt } from "react-icons/bi"
import { FaSortAmountDown } from "react-icons/fa"

interface Props {
    handleClick: () => void;
}

const FilterSortButton: FC<Props> = ({handleClick}) => {
    return <div className="bg-light-gray rounded-full py-1 px-2.5 flex gap-5 items-center">
        <button className="py-2">
            <FaSortAmountDown size={16} className="text-dark-yellow" />
        </button>
        <div className="w-0.5 h-6 bg-dark-yellow"></div>
        <button onClick={handleClick}>
            <BiFilterAlt size={16} className="text-white" />
        </button>
    </div>
}

export default FilterSortButton;