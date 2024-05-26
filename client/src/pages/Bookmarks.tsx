import { FC, useState } from "react"
import { useGetBookmarksQuery } from "../services/bookmarks.service";
import Header from "../components/parts/Header";
import Loader from "../components/parts/Loader";
import IsEmpty from "../components/parts/IsEmpty";
import SimplyPagination from "../components/parts/SimplyPagination";
import Footer from "../components/parts/Footer";

const Bookmarks: FC = () => {
    const [searchData, setSearchData] = useState('');

    const {data: bookmarksMovies, isLoading} = useGetBookmarksQuery(searchData);
    const bookmarks = bookmarksMovies?.movies; 

    const handleSearch = (text: string) => {
        setSearchData(text);
    }
    
    return <div className="min-h-screen flex flex-col w-full">
        <Header currentPage="bookmarks" handleClick={handleSearch} showSearchBox={true}/>
        <div className="flex flex-1">
            {isLoading && (
                <div className="flex justify-center items-center flex-1">
                    <Loader />
                </div>
            )}
            {bookmarks && bookmarks?.length !== 0 && (
                <SimplyPagination itemsPerPage={18} movies={bookmarks} />
            )}
            {bookmarks && bookmarks?.length === 0 && (
                <div className="flex flex-1 items-center justify-center">
                    <IsEmpty path="/movies" text="Looks like you don't have any movies" textButton="+ Movies" key="bookmarksIsEmpty" />
                </div>
            )}
        </div>
        <Footer />
    </div>
}

export default Bookmarks