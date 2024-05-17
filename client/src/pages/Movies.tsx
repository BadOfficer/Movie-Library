import { FC, useState } from "react"
import Header from "../components/parts/Header";
import MoviesNavigation from "../components/movies/MoviesNavigation";
import { useGetGenresQuery } from "../services/genres.service";
import { useGetAllowFilmsQuery, useGetMoviesQuery } from "../services/movies.service";
import SectionTitle from "../components/parts/SectionTitle";
import CountSelect from "../components/parts/CountSelect";
import FilterSortButton from "../components/buttons/FilterSortButton";
import Loader from "../components/parts/Loader";
import PaginatedMovies from "../components/movies/PaginatedMovies";
import Footer from "../components/parts/Footer";
import Filters from "../components/parts/Filters";
import FilterGroup from "../components/parts/FilterGroup";

const Movies: FC = () => {

    const [countValue, setCountValue] = useState<number>(18);
    const [offsetValue, setOffsetValue] = useState(0)

    const [activeReleases, setActiveReleases] = useState<any[]>([]);
    const [activeDurations, setActiveDuration] = useState<any[]>([]);
    const [activeRatings, setActiveRatings] = useState<any[]>([]);
    const [idsGenres, setIdsGenres] = useState<number[]>([]);
    const [searchData, setSearchData] = useState('');

    const {data: genres} = useGetGenresQuery('');
    const [showFilter, setShowFilter] = useState(false);
    
    const {data: moviesResponse, isLoading: loadingMovies} = useGetMoviesQuery(`${countValue},${offsetValue},${activeReleases.join(';')},${activeDurations.join(';')},${activeRatings.join(';')},${searchData},${idsGenres.join(';')}`);
    const {data: allowMoviesResponse} = useGetAllowFilmsQuery('');

    const movies = moviesResponse?.rows;
    const allowMovies = allowMoviesResponse?.rows;

    let ratings: string[] = [];
    let years: string[] = [];
    let durations: string[] = [];

    if(allowMovies) {
        allowMovies.map(movie => {
            if(!ratings.includes(movie.rating)) {
                ratings.push(movie.rating)
            }
            if(!years.includes(movie.release)) {
                years.push(movie.release)
            }
            if(!durations.includes(movie.duration)) {
                durations.push(movie.duration)
            }
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const releaseYears = formData.getAll('release[]');
        const durations = formData.getAll('duration[]');
        const ratings = formData.getAll('rating[]');
        setActiveReleases(releaseYears);
        setActiveDuration(durations);
        setActiveRatings(ratings);
        setOffsetValue(0)
        setShowFilter(false);
    }

    const handleChangeCount = (count: number) => {
        setOffsetValue(0);
        setCountValue(count);
    }

    const handleSearch = (text: string) => {
        setOffsetValue(0);
        setSearchData(text);
    }

    const handleShowFilters = () => {
        setShowFilter(state => !state);
    }

    const handleSetGenresIds = (id: number) => {
        setIdsGenres(prevIds => {
          if (prevIds.includes(id)) {
              const newItems = prevIds.filter(item => item !== id)
              return newItems;
          } else {
              return [...prevIds, id];
          }
        });
    }
    
    return <div className="flex flex-col min-h-screen">
        <Header currentPage="movies" handleClick={handleSearch}/>
        <div className="mt-12 flex gap-12 flex-col flex-1">
            <MoviesNavigation genres={genres} handleIdsGenres={handleSetGenresIds}/>
            <div className="flex justify-between items-center">
                <SectionTitle>All Movies</SectionTitle>
                <div className="flex items-center gap-9">
                    <CountSelect handleCount={handleChangeCount} count={countValue}/>
                    <FilterSortButton handleClick={handleShowFilters}/>
                </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-12">
                {movies?.length === 0 && (
                    <div className="flex items-center flex-1">
                        <p className="text-3xl text-orange-700">Movies not found!</p>
                    </div>
                )}
                {loadingMovies && (
                    <div className="flex items-center flex-1">
                        <Loader />
                    </div>
                )}
                {movies && movies.length !== 0 && (
                    <PaginatedMovies movies={movies} itemsPerPage={countValue} handleNewOffset={setOffsetValue} countMovies={moviesResponse.count}/>
                )}
            </div>
        </div>
        {showFilter && (
            <Filters handleActive={handleShowFilters}>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-9">
                    <div>
                        <div>
                            <p className="capitalize">Release year:</p>
                            <span className="block w-full h-0.5 bg-dark-yellow my-2"></span>
                        </div>
                        <FilterGroup name="release" data={years} selectedItems={activeReleases}/>
                    </div>
                    <div>
                        <div>
                            <p className="capitalize">Duration:</p>
                            <span className="block w-full h-0.5 bg-dark-yellow my-2"></span>
                        </div>
                        <FilterGroup name="duration" data={durations} selectedItems={activeDurations}/>
                    </div>
                    <div>
                        <div>
                            <p className="capitalize">Rating:</p>
                            <span className="block w-full h-0.5 bg-dark-yellow my-2"></span>
                        </div>
                        <FilterGroup name="rating" data={ratings} selectedItems={activeRatings}/>
                    </div>
                    <div className="flex gap-6 justify-center">
                        <button type="submit" className="px-4 py-2 border-2 border-light-yellow bg-light-yellow text-dark-gray rounded-xl font-medium hover:bg-dark-yellow hover:border-dark-yellow">Apply</button>
                        <button onClick={() => setShowFilter(false)} className="px-4 py-2 border-2 rounded-xl border-dark-yellow hover:bg-dark-yellow font-medium hover:text-dark-gray">Cancel</button>
                    </div>
                </form>
            </Filters>
        )}
        <Footer />
    </div>
}

export default Movies;