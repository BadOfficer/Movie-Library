import { FC } from "react";
import { IoSearch } from "react-icons/io5";


const Search: FC = () => {
    return <div className="relative">
        <input type="text" className="min-w-96 w-full max-h-9 rounded-full bg-light-gray border-0 outline-0 pl-5 text-white/75" placeholder="Search..."/>
        <button className="bg-light-yellow p-2.5 rounded-full text-dark-gray absolute right-0">
            <IoSearch size={16}/>
        </button>
    </div>
}

export default Search;