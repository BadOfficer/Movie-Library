import { FC } from "react";

interface Props {
    children: JSX.Element;
    handleActive: () => void;
}

const Filters: FC<Props> = ({ children, handleActive }) => {

    const handleClickForm = (e: any) => {
        e.stopPropagation();
    }

    return <div className="fixed w-full h-full top-0 left-0 bg-dark-gray/50" onClick={handleActive}>
            <div className="bg-light-gray h-full max-w-72 right-0 flex flex-col overflow-auto" onClick={handleClickForm}>
                <h3 className="uppercase font-semibold text-3xl mt-9 text-center">Filters</h3>
                <div className="mt-9 px-2.5">
                    {children}
                </div>
            </div>
        </div>
}

export default Filters;