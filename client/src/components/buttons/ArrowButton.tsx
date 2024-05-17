import { FC } from "react";

interface Props {
    children: JSX.Element;
    handleClick?: () => void;
}

const ArrowButton: FC<Props> = ({ children, handleClick }) => {
    return <button onClick={handleClick} className="p-2.5 rounded-xl bg-light-yellow hover:bg-dark-yellow text-dark-gray">
        {children}
    </button>
}

export default ArrowButton;