// const handleChangeGenresFilter = (id: number) => {
//     setIdsGenres(prevIds => {
//         if (prevIds.includes(id)) {
//             const newItems = prevIds.filter(item => item !== id)
//             return newItems;
//         } else {
//             return [...prevIds, id];
//         }
//       });
// }

// const handleDecPage = () => {
//     setPage(curPage => curPage === 0 ? curPage = 0 : curPage - 1);
// }

// const handleIncPage = () => {
//     setPage(curPage => curPage === totalPages ? curPage = totalPages : curPage + 1);
// }

// const totalPages = Math.ceil(movies?.length ? movies?.length / countValue : 1);


// const renderPaginationButtons = () => {
//     const buttons = [];

//     for (let i = 1; i <= totalPages; i++) {
//         buttons.push(
//             <button key={i} onClick={() => setPage(i)} className={`${i === page ? 'text-white' : 'text-white/75'} text-lg`}>{i}</button>
//         );
//     }

//     return buttons;
// };

