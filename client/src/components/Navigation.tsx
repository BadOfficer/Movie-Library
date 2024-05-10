import { FiServer } from "react-icons/fi"
import { BiHomeAlt2, BiSolidMoviePlay } from "react-icons/bi";
import NavButton from "./buttons/NavButton";
import { FC } from "react";

const Navigation: FC = () => {
    return <nav className="mt-[50px]">
            <ul className="flex flex-col gap-5">
                <li>
                    <NavButton path="/">
                        <BiHomeAlt2 size={20}/>
                        <span>Home</span>
                    </NavButton>
                </li>
                <li>
                    <NavButton path="/movies">
                        <BiSolidMoviePlay size={20}/>
                        <span>Movies</span>
                    </NavButton>
                </li>
                <li>
                    <NavButton path="/series">
                        <FiServer size={20}/>
                        <span>Series</span>
                    </NavButton>
                </li>
            </ul>
            
        </nav>
}

export default Navigation;