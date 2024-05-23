import { FC, useState } from "react"
import Header from "../components/parts/Header"
import { useGetLikedQuery} from "../services/liked.service"
import Loader from "../components/parts/Loader"
import IsEmpty from "../components/parts/IsEmpty"
import SimplyPagination from "../components/parts/SimplyPagination"
import Footer from "../components/parts/Footer"

const Liked: FC = () => {
    const [searchData, setSearchData] = useState('');
    const {data: likedMovies, isLoading} = useGetLikedQuery(searchData);
    const liked = likedMovies?.movies; 

    const handleSearch = (text: string) => {
        setSearchData(text);
    }
    
    return <div className="min-h-screen flex flex-col w-full">
        <Header currentPage="liked" handleClick={handleSearch} showSearchBox={true}/>
        <div className="flex flex-1">
            {isLoading && (
                <div className="flex justify-center items-center flex-1">
                    <Loader />
                </div>
            )}
            {liked && liked?.length !== 0 && (
                <SimplyPagination itemsPerPage={18} movies={liked} />
            )}
            {liked && liked?.length === 0 && (
                <div className="flex flex-1 items-center justify-center">
                    <IsEmpty path="/movies" text="Looks like you don't have any movies" textButton="+ Movies" key="LikedIsEmpty" />
                </div>
            )}
        </div>
        <Footer />
    </div>
}

export default Liked