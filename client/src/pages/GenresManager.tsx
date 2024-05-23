import { FC, useState } from "react"
import Header from "../components/parts/Header";
import GenreModal from "../components/genres/GenreModal";
import { IGenreInput } from "../types/types";
import { useCreateGenreMutation, useDeleteGenreMutation, useGetGenresQuery, useUpdateGenreMutation } from "../services/genres.service";
import Loader from "../components/parts/Loader";
import { toast } from "react-toastify";
import SolidButton from "../components/buttons/SolidButton";
import IsEmpty from "../components/parts/IsEmpty";
import PaginatedGenres from "../components/genres/PaginatedGenres";
import Footer from "../components/parts/Footer";

const GenresManager: FC = () => { 
    const [showModal, setShowModal] = useState<boolean>(false); 
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [genreId, setGenreId] = useState<number>(0);

    const [curTitle, setCurTitle] = useState('');
    const [curDescription, setCurDescription] = useState('');
    
    const [searchData, setSearchData] = useState('');
    const [offset, setOffset] = useState(0);
    const count = 18;
    
    const {isLoading, isError, data: genresResponse} = useGetGenresQuery(`${searchData},${count},${offset}`);
    const genres = genresResponse?.rows;

    const [createGenre, {}] = useCreateGenreMutation();
    const [updateGenre, {}] = useUpdateGenreMutation();
    const [deleteGenre, {}] = useDeleteGenreMutation();

    const handleSearch = (text: string) => {
        setSearchData(text);
    }

    const handleClick = (id: number, title: string, description: string) => {
        setShowModal(true)
        setGenreId(id)
        setCurTitle(title)
        setCurDescription(description)
        setIsEdit(true)
    }

    const handleCreate = async(genre: IGenreInput) => {
        try{
            await createGenre(genre);
            toast.success(`${genre.title} has been added!`)
        } catch(e) {
            toast.error("Something went wrong!")
        }
        
    }

    const handleUpdate = async(genre: IGenreInput) => {
        try{
            await updateGenre(genre)
            toast.success(`${genre.title} has been updated!`);
            setIsEdit(false)
        } catch(e) {
            toast.error("Something went wrong!")
        }
    }

    const handleDelete = async(genreId: number) => {
        try {
            await deleteGenre(genreId);
            toast.success('Genre has been deleted!')
        } catch(e) {
            toast.error("Something went wrong!")
        }``
    }

    return <>
        {showModal && <GenreModal setVisible={setShowModal} type="post" handleClick={handleCreate} setEditState={setIsEdit}/>}
        {showModal && isEdit && <GenreModal setVisible={setShowModal} type="patch" id={genreId} curTitle={curTitle} curDescription={curDescription} handleClick={handleUpdate} setEditState={setIsEdit}/>}
        <div className="w-full flex flex-col flex-1">
            <Header currentPage="Genres" handleClick={handleSearch} showSearchBox={true}/>
            <div className="relatrive mt-12 flex-1 flex flex-col mx-2.5 lg:mx-2.5">
                <div className="w-full bg-light-gray py-2.5 px-6 flex justify-between items-center rounded-xl">
                    <h3 className="text-xl">Actions: </h3>
                    <div>
                        <SolidButton handleClick={() => setShowModal(true)}>Add genre</SolidButton>
                    </div>
                </div>

                <h2 className="mt-12 text-2xl text-center uppercase font-semibold">Genres list</h2>
                {isLoading && (
                    <div className="flex items-center justify-center flex-1">
                        <Loader />
                    </div>
                )}
                {isError && (<p>Something went wrong!!!</p>)}
                {genres?.length === 0 ? (
                    <div className="flex items-center justify-center flex-1">
                        <IsEmpty text="It seems that no genre was found!" />
                    </div>
                ) : (
                    <PaginatedGenres genres={genres} handleClick={handleClick} handleDelete={handleDelete} countGenres={genresResponse?.count || 0} handleSetNewOffset={setOffset} itemsPerPage={count}/>
                )}
            </div>
            <Footer />
        </div>
    </>
}

export default GenresManager;