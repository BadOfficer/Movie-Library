import { FC } from "react";

interface Props {
    children: string | JSX.Element;
    handleClick?: ((argument: any) => void) | (() => void);
    type?: 'button' | 'submit' | 'reset'
}

const SolidButton: FC<Props> = ({children, handleClick, type}) => {
    return <button type={type} onClick={handleClick} className="px-6 py-2 bg-light-yellow rounded-lg text-dark-gray hover:bg-dark-yellow">{children}</button>
}

export default SolidButton;