import { FC } from "react"
import Header from "../components/parts/Header"
import Slider from "../components/parts/Slider"
import { useGetRecentlyFilmsQuery, useGetRecentlySeriesQuery, useGetSlierMoviesQuery } from "../services/movies.service"
import Loader from "../components/parts/Loader"
import RecentlyMovies from "../components/parts/RecentlyMovies"
import Footer from "../components/parts/Footer"

const Home: FC = () => {
    const {data: sliderMovies, isLoading: sliderMoviesLoading} = useGetSlierMoviesQuery('');

    const {data: recentlyFilms, isLoading: loadingRecentlyFilms} = useGetRecentlyFilmsQuery("");
    const {data: recentlySeries, isLoading: loadingRecentlySeries} = useGetRecentlySeriesQuery("");

    return <div className="flex flex-col gap-12">
        <Header currentPage="home" />
        <div>
            {sliderMoviesLoading && (
                <div className="flex justify-center">
                    <Loader />
                </div>
            )}
            {sliderMovies && sliderMovies.length !== 0 && (
                <div className="flex justify-center">
                    <Slider initialActive={sliderMovies[0].id} movies={sliderMovies} />
                </div>
            )}
        </div>
        <div className="flex flex-col gap-9">
            <RecentlyMovies loading={loadingRecentlyFilms} movies={recentlyFilms || []} sectionTitle="recently movies" />
        </div>
        <div className="flex flex-col gap-9">
            <RecentlyMovies loading={loadingRecentlySeries} movies={recentlySeries || []} sectionTitle="recently series" />
        </div>
        <Footer />
    </div>
}

export default Home