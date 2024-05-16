import { FC, useState } from "react";
import Search from "../inputs/Search";

interface HeaderProps {
    currentPage: string;
    handleClick?: (text: string) => void
}

const Header: FC<HeaderProps> = ({ currentPage, handleClick }) => {

    return (
            <header className="flex relative mt-9">
                <h1 className="text-5xl uppercase font-bold">{currentPage}</h1>
                <div className="flex-1  flex justify-center absolute centered">
                    <Search handleClick={handleClick}/>
                </div>
            </header>
        )
}

export default Header