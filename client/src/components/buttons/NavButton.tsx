import { FC } from "react"
import { NavLink } from "react-router-dom";

interface NavButtonProps {
    children: React.ReactNode;
    path: string;
}

const NavButton: FC<NavButtonProps> = ({ children, path }) => {
    return <NavLink to={path} className={({isActive}) => `${isActive ? "active" : "text-white/50"} text-white flex items-center gap-2.5 px-[35px] hover:text-white`}>
        {children}
    </NavLink>
}

export default NavButton;