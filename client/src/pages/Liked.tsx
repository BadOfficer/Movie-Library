import { FC, useState } from "react"
import Header from "../components/parts/Header"
import { useGetLikedQuery} from "../services/liked.service"
import Loader from "../components/parts/Loader"
import Movie from "../components/movies/Movie"

const Liked: FC = () => {
    const [searchData, setSearchData] = useState('');
    const {data: likedMovies, isLoading} = useGetLikedQuery(searchData);
    const liked = likedMovies?.movies; 

    const handleSearch = (text: string) => {
        setSearchData(text);
    }
    
    return <div className="min-h-screen flex flex-col">
        <Header currentPage="liked" handleClick={handleSearch}/>
        <div className="flex flex-1">
            {isLoading && <div className="flex justify-center items-center flex-1">
                    <Loader />
                </div>}
            {liked && liked?.length !== 0 && (
                <div className="grid grid-cols-6">
                    {liked.map(movie => (
                        <Movie key={movie.id} id={movie.id} title={movie.title} image={`http://localhost:3000/${movie.images[0]}`} rating={movie.rating} year={movie.release} />
                    ))}
                </div>
            )}
            {liked && liked?.length === 0 && (
                <div className="flex flex-1 items-center justify-center">
                    Movies list is empty!
                </div>
            )}
        </div>
    </div>
}

export default Liked