import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    path?: string,
    text: string,
    textButton?: string
}

const IsEmpty: FC<Props> = ({path, text, textButton}) => {
    return <div className="flex flex-col gap-9 items-center">
            <img src="folder.png" alt="Is Empty" className="max-w-36"/>
            <h2 className="text-xl text-light-yellow font-semibold">{text}</h2>
            {path && (
                <Link to={path} className="px-6 py-2 bg-light-yellow text-dark-gray rounded-xl hover:bg-dark-yellow">{textButton}</Link>
            )}
        </div>
}

export default IsEmpty;