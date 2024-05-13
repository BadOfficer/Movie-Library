import { FC } from "react";
import Search from "../inputs/Search";

interface HeaderProps {
    currentPage: string;
}

const Header: FC<HeaderProps> = ({ currentPage }) => {

    return (
            <header className="flex relative mt-9">
                <h1 className="text-5xl uppercase font-bold">{currentPage}</h1>
                <div className="flex-1  flex justify-center absolute centered">
                    <Search />
                </div>
            </header>
        )
}

export default Header