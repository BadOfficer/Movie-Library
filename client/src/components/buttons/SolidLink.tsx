import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    path: string;
    children: string | JSX.Element;
}

const SolidLink: FC<Props> = ({ children, path }) => {
    return <Link to={path} className="px-6 py-2 bg-light-yellow text-dark-gray rounded-xl hover:bg-dark-yellow">{children}</Link>
}

export default SolidLink;