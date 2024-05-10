import { FC } from "react";

interface HeaderProps {
    currentPage: string;
}

const Header: FC<HeaderProps> = ({ currentPage }) => {

    return (
            <header>
                <h1>{currentPage}</h1>
            </header>
        )
}

export default Header