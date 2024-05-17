import { FC, useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

interface Props {
    count: number;
    handleCount: (count: number) => void
}

const CountSelect: FC<Props> = ({ count, handleCount }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (count: number) => {
        handleCount(count);
        setIsOpen(false);
    }

    const handleClick = () => {
        setIsOpen(state => !state);
    }
    
    return <div className="relative">
            <div className="dropdown-wrapper">
                <div className="pl-2.5 pr-1 py-2 dropdown-trigger bg-light-gray flex gap-5 rounded-full cursor-pointer" onClick={handleClick}>
                    <span>{count}</span>   
                    <MdKeyboardArrowDown size={24} className="text-dark-yellow"/>
                </div>
                {isOpen && (
                    <div className="dropdown-menu absolute z-10 bg-light-gray rounded-lg shadow-md mt-2 w-full flex flex-col items-center overflow-hidden">
                        <button className="dropdown-item text-base py-1 hover:bg-dark-yellow w-full" onClick={() => handleSelect(18)}>18</button>
                        <button className="dropdown-item text-base py-1 hover:bg-dark-yellow w-full" onClick={() => handleSelect(24)}>24</button>
                        <button className="dropdown-item text-base py-1 hover:bg-dark-yellow w-full" onClick={() => handleSelect(30)}>30</button>
                    </div>
                )}
            </div>
        </div>
}

export default CountSelect