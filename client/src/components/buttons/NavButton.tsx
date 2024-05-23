import { FC } from "react"
import { NavLink } from "react-router-dom";

interface NavButtonProps {
    children: React.ReactNode;
    path: string;
    handleClick?: () => void
}

const NavButton: FC<NavButtonProps> = ({ children, path, handleClick }) => {
    return <NavLink to={path} onClick={handleClick} className={({isActive}) => `${isActive ? "active" : "text-white/50"} text-white flex items-center gap-2.5 px-9 hover:text-white`}>
        {children}
    </NavLink>
}

export default NavButton;