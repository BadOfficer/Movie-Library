import { FC, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface Props {
    handleClick?: (text: string) => void
}

const Search: FC<Props> = ({ handleClick = () => {} }) => {
    const [search, setSearch] = useState('');

    return <div className="relative">
        <input type="text" maxLength={255} className="min-w-20 xl:min-w-96 w-full max-h-9 rounded-full bg-light-gray border-0 outline-0 pl-5 text-white/75" placeholder="Search..." value={search} onChange={(e) => {
            if(e.target.value === '') {
                handleClick('');
            }
            setSearch(e.target.value)
        }}/>
        <button className="bg-light-yellow p-2.5 rounded-full text-dark-gray absolute right-0 hover:bg-dark-yellow" onClick={() => handleClick(search)}>
            <IoSearch size={16}/>
        </button>
    </div>
}

export default Search;