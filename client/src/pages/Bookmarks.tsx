import { FC, useState } from "react"
import { useGetBookmarksQuery } from "../services/bookmarks.service";
import Header from "../components/parts/Header";
import Loader from "../components/parts/Loader";
import Movie from "../components/movies/Movie";

const Bookmarks: FC = () => {
    const [searchData, setSearchData] = useState('');
    const {data: bookmarksMovies, isLoading} = useGetBookmarksQuery(searchData);
    const bookmarks = bookmarksMovies?.movies; 

    const handleSearch = (text: string) => {
        setSearchData(text);
    }
    
    return <div className="min-h-screen flex flex-col">
        <Header currentPage="bookmarks" handleClick={handleSearch}/>
        <div className="flex flex-1">
            {isLoading && <div className="flex justify-center items-center flex-1">
                    <Loader />
                </div>}
            {bookmarks && bookmarks?.length !== 0 && (
                <div className="grid grid-cols-6">
                    {bookmarks.map(movie => (
                        <Movie key={movie.id} id={movie.id} title={movie.title} image={`http://localhost:3000/${movie.images[0]}`} rating={movie.rating} year={movie.release} />
                    ))}
                </div>
            )}
            {bookmarks && bookmarks?.length === 0 && (
                <div className="flex flex-1 items-center justify-center">
                    Movies list is empty!
                </div>
            )}
        </div>
    </div>
}

export default Bookmarks