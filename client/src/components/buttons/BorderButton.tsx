import { FC } from "react";

interface Props {
    children: string | JSX.Element;
    handleClick?: ((argument: any) => void) | (() => void);
    type?: 'button' | 'submit' | 'reset'
}

const BorderButton: FC<Props> = ({children, handleClick, type}) => {
    return  <button type={type} onClick={handleClick} className="px-4 sm:px-6 py-1 sm:py-2 border-2 border-light-yellow rounded-xl text-light-yellow hover:bg-light-yellow hover:text-dark-gray">{children}</button>
}

export default BorderButton;