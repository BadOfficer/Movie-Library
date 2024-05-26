import { FC } from "react";

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
    return <nav>
            <ul className="flex flex-col gap-5">
                {children}
            </ul>
        </nav>
}

export default Navigation;