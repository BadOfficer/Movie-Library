import { FC } from "react";
import Search from "../inputs/Search";

interface HeaderProps {
    currentPage: string;
    handleClick?: (text: string) => void
    showSearchBox?: boolean
}

const Header: FC<HeaderProps> = ({ currentPage, handleClick, showSearchBox }) => {

    return (
            <header className="flex relative mt-9">
                <h1 className="text-5xl uppercase font-bold hidden xl:block">{currentPage}</h1>
                {showSearchBox && (
                    <div className="flex-1  flex justify-center absolute centered">
                        <Search handleClick={handleClick}/>
                    </div>
                )}
            </header>
        )
}

export default Header