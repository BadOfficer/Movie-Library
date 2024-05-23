// // const handleChangeGenresFilter = (id: number) => {
// //     setIdsGenres(prevIds => {
// //         if (prevIds.includes(id)) {
// //             const newItems = prevIds.filter(item => item !== id)
// //             return newItems;
// //         } else {
// //             return [...prevIds, id];
// //         }
// //       });
// // }

// // const handleDecPage = () => {
// //     setPage(curPage => curPage === 0 ? curPage = 0 : curPage - 1);
// // }

// // const handleIncPage = () => {
// //     setPage(curPage => curPage === totalPages ? curPage = totalPages : curPage + 1);
// // }

// // const totalPages = Math.ceil(movies?.length ? movies?.length / countValue : 1);


// // const renderPaginationButtons = () => {
// //     const buttons = [];

// //     for (let i = 1; i <= totalPages; i++) {
// //         buttons.push(
// //             <button key={i} onClick={() => setPage(i)} className={`${i === page ? 'text-white' : 'text-white/75'} text-lg`}>{i}</button>
// //         );
// //     }

// //     return buttons;
// // };



// import { FC, useEffect, useState } from "react";
// import SectionTitle from "./SectionTitle";
// import ArrowButton from "../buttons/ArrowButton";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IMovie } from "../../types/types";
// import Loader from "./Loader";
// import Movie from "../movies/Movie";

// interface Props {
//     sectionTitle: string;
//     loading: boolean;
//     movies: IMovie[];
// }

// const RecentlyMovies: FC<Props> = ({sectionTitle, loading, movies}) => {

//     const [offset, setOffset] = useState(0);
//     const [itemsPerPage, setItemsPerPage] = useState(6);

//     const handleNextMovie = () => {
//         setOffset((state) => (state + 1 >= movies.length ? 0 : state + 1));
//     };

//     const handlePrevMovie = () => {
//         setOffset((state) => (state - 1 < 0 ? movies.length - 1 : state - 1));
//     };

//     const showedMovies = movies.slice(offset, offset + itemsPerPage);

//     if (showedMovies.length < itemsPerPage) {
//         showedMovies.push(...movies.slice(0, itemsPerPage - showedMovies.length));
//     }

//     const updateItemsPerPage = () => {
//         const width = window.innerWidth;
//         if (width >= 1536) {
//             setItemsPerPage(6);
//         } else if (width >= 1280) {
//             setItemsPerPage(4);
//         } else if (width >= 1024) {
//             setItemsPerPage(3);
//         } else if (width >= 768) {
//             setItemsPerPage(3);
//         } else if (width >= 640) {
//             setItemsPerPage(2);
//         } else {
//             setItemsPerPage(1);
//         }
//     };

//     useEffect(() => {
//         updateItemsPerPage();
//         window.addEventListener('resize', updateItemsPerPage);
//         return () => window.removeEventListener('resize', updateItemsPerPage);
//     }, []);

//     return <div className="flex flex-col gap-9 px-3 lg:px-0">
//                 <div className="flex justify-start gap-9">
//                     <SectionTitle>{sectionTitle}</SectionTitle>
//                     <div className="flex gap-5">
//                         <ArrowButton handleClick={handlePrevMovie}>
//                             <MdKeyboardArrowLeft size={20}/>
//                         </ArrowButton>
//                         <ArrowButton handleClick={handleNextMovie}>
//                             <MdKeyboardArrowRight size={20}/>
//                         </ArrowButton>
//                     </div>
//                 </div>
//                 <div className="flex justify-center">
//                     {loading && (
//                         <Loader />
//                     )}
//                     {movies && movies.length !== 0 && (
//                         <div className="flex gap-6 2xl:gap-12">
//                             {showedMovies.map(film => (
//                                 <Movie id={film.id} image={`http://localhost:3000/${film.images[0]}`} rating={film.rating} title={film.title} year={film.release} key={film.id} />
//                             ))}
//                         </div>
//                     )}
//                      {movies.length === 0 && (
//                         <p className="m-12">Movies not found!</p>
//                      )}
//                 </div>
//             </div>
// }

// export default RecentlyMovies;