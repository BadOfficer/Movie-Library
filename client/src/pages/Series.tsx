import { FC, useState } from "react"
import Header from "../components/parts/Header"
import { useGetGenresQuery } from "../services/genres.service";
import { useGetAllowSeriesQuery, useGetSeriesQuery } from "../services/movies.service";
import MoviesNavigation from "../components/movies/MoviesNavigation";
import SectionTitle from "../components/parts/SectionTitle";
import CountSelect from "../components/parts/CountSelect";
import FilterSortButton from "../components/buttons/FilterSortButton";
import IsEmpty from "../components/parts/IsEmpty";
import Loader from "../components/parts/Loader";
import PaginatedMovies from "../components/movies/PaginatedMovies";
import Filters from "../components/parts/Filters";
import FilterGroup from "../components/parts/FilterGroup";
import SolidButton from "../components/buttons/SolidButton";
import BorderButton from "../components/buttons/BorderButton";
import Footer from "../components/parts/Footer";


const Series: FC = () => {
    const [countValue, setCountValue] = useState<number>(18);
    const [offsetValue, setOffsetValue] = useState<number>(0)

    const [activeSeries, setActiveSeries] = useState<any[]>([]);
    const [activeSeasons, setActiveSeasons] = useState<any[]>([]);
    const [activeReleases, setActiveReleases] = useState<any[]>([]);
    const [activeDurations, setActiveDuration] = useState<any[]>([]);
    const [activeRatings, setActiveRatings] = useState<any[]>([]);
    const [idsGenres, setIdsGenres] = useState<number[]>([]);
    const [searchData, setSearchData] = useState('');

    const {data: genresResponse} = useGetGenresQuery('');
    const genres = genresResponse?.rows;
    const [showFilter, setShowFilter] = useState(false);

    const {data: moviesResponse, isLoading: loadingMovies} = useGetSeriesQuery(`${countValue},${offsetValue},${activeReleases.join(';')},${activeDurations.join(';')},${activeRatings.join(';')},${searchData},${idsGenres.join(';')},${activeSeries.join(';')},${activeSeasons.join(';')}`);
    const {data: allowMoviesResponse} = useGetAllowSeriesQuery('');

    const movies = moviesResponse?.rows;
    const allowMovies = allowMoviesResponse?.rows;

    let ratings: string[] = [];
    let years: string[] = [];
    let durations: string[] = [];
    let series: string[] = [];
    let seasons: string[] = [];

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
            if(!series.includes(movie.series.toString())) {
                series.push(movie.series.toString())
            }
            if(!seasons.includes(movie.seasons.toString())) {
                seasons.push(movie.seasons.toString());
            }
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const releaseYears = formData.getAll('release[]');
        const durations = formData.getAll('duration[]');
        const ratings = formData.getAll('rating[]');
        const seasons = formData.getAll('seasons[]');
        const series = formData.getAll('series[]');
        
        setActiveReleases(releaseYears);
        setActiveDuration(durations);
        setActiveRatings(ratings);
        setActiveSeasons(seasons);
        setActiveSeries(series);
        setOffsetValue(0);
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

    return <div className="flex flex-col min-h-screen w-full">
        <Header currentPage="series" showSearchBox={true} handleClick={handleSearch}/>
        <div className="flex gap-12 flex-col flex-1 p-6 lg:p-0">
            <MoviesNavigation genres={genres} handleIdsGenres={handleSetGenresIds}/>
            <div className="flex justify-between items-center gap-3 lg:gap-9">
            <div className="justify-start flex lg:flex-1">
                    <SectionTitle>All Series</SectionTitle>
                </div>
                <CountSelect handleCount={handleChangeCount} count={countValue}/>
                <FilterSortButton handleClick={handleShowFilters}/>
            </div>
            <div className="flex flex-1 flex-col items-center gap-12">
                {movies?.length === 0 && (
                    <div className="flex items-center flex-1">
                        <IsEmpty text="It seems that no movies was found." />
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
                    <div>
                        <div>
                            <p className="capitalize">Seasons:</p>
                            <span className="block w-full h-0.5 bg-dark-yellow my-2"></span>
                        </div>
                        <FilterGroup name="seasons" data={seasons} selectedItems={activeSeasons}/>
                    </div>
                    <div>
                        <div>
                            <p className="capitalize">Series:</p>
                            <span className="block w-full h-0.5 bg-dark-yellow my-2"></span>
                        </div>
                        <FilterGroup name="series" data={series} selectedItems={activeSeries}/>
                    </div>
                    <div className="flex gap-6 justify-center">
                        <SolidButton type="submit" >Apply</SolidButton>
                        <BorderButton handleClick={() => setShowFilter(false)}>Cancel</BorderButton>
                    </div>
                </form>
            </Filters>
        )}
        <Footer />
    </div>
}

export default Series