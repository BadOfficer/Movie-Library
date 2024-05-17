import { FC, useState } from "react";

interface Props {
    title: string;
    id: number;
    moviesAmount: number;
    setGenreId: (id: number) => void;
}

const GenreFilterButton: FC<Props> = ({ title, id, moviesAmount, setGenreId }) => {

    const [active, setActive] = useState<boolean>(false);

    const handleClick = () => {
        setActive(state => !state);
        setGenreId(id)
    }

    return <button className={`py-2.5 px-3.5 rounded-xl hover:bg-dark-yellow ${active ? 'bg-dark-yellow' : 'bg-light-gray'} group flex flex-col font-semibold w-28 text-main`} onClick={handleClick}>
        <input type="text" defaultValue={id} className="hidden" name="id"/>
        <span className="text-white">{title}</span>
        <span className={`group-hover:text-dark-gray ${active ? 'text-dark-gray' : 'text-dark-yellow'}`}>{moviesAmount} {moviesAmount === 1 ? 'item' : 'items'}</span>
    </button>
}

export default GenreFilterButton;