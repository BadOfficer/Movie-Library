import { FC, useState } from "react"
import Header from "../components/parts/Header";
import Genre from "../components/genres/Genre";
import GenreModal from "../components/genres/GenreModal";
import GenreButton from "../components/genres/GenreButton";
import { IGenreInput } from "../types/types";
import { useCreateGenreMutation, useDeleteGenreMutation, useGetGenresQuery, useUpdateGenreMutation } from "../services/genres.service";
import Loader from "../components/parts/Loader";
import { toast } from "react-toastify";

const GenresManager: FC = () => { 
    const [showModal, setShowModal] = useState<boolean>(false); 
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [genreId, setGenreId] = useState<number>(0);
    const [curTitle, setCurTitle] = useState('');
    const [curDescription, setCurDescription] = useState('');
    
    const [searchData, setSearchData] = useState('');
    const {isLoading, isError, data: genres, refetch} = useGetGenresQuery(searchData);
    const [createGenre, {isError: creatingError}] = useCreateGenreMutation();
    const [updateGenre, {isError: updatingError}] = useUpdateGenreMutation();
    const [deleteGenre, {isError: deletingError}] = useDeleteGenreMutation();

    const handleSearch = (text: string) => {
        refetch();
        setSearchData(text);
    }

    const handleCreate = async(genre: IGenreInput) => {
        await createGenre(genre);

        if(creatingError) {
            toast.success(`${genre.title} has been added!`)
        } else {
            toast.error("Something went wrong!")
        }
        
    }

    const handleUpdate = async(genre: IGenreInput) => {
        await updateGenre(genre)
       
        if(!updatingError) {
            toast.success(`${genre.title} has been updated!`)
        } else {
            toast.error("Something went wrong!")
        }
    }

    const handleDelete = async(genreId: number) => {
        await deleteGenre(genreId);
       
        if(!deletingError) {
            toast.success('Genre has been deleted!')
        } else {
            toast.error("Something went wrong!")
        }
    }

    return <>
        {showModal && <GenreModal setVisible={setShowModal} type="post" handleClick={handleCreate}/>}
        {showModal && isEdit && <GenreModal setVisible={setShowModal} type="patch" id={genreId} curTitle={curTitle} curDescription={curDescription} handleClick={handleUpdate}/>}
        <>
            <Header currentPage="Genres" handleClick={handleSearch}/>
            <div className="relatrive mt-12 flex-1 flex flex-col">
                <div className="w-full bg-light-gray py-2.5 px-6 flex justify-between items-center rounded-xl">
                    <h3 className="text-xl">Actions: </h3>
                    <div>
                        <GenreButton handleClick={() => setShowModal(true)}>Add genre</GenreButton>
                    </div>
                </div>

                <h2 className="mt-12 text-2xl text-center uppercase font-semibold">Genres list</h2>
                <div className="flex justify-center flex-1">
                    {isLoading && (<Loader />)}
                    {isError && (<p>Something went wrong!!!</p>)}
                    {genres?.length === 0 ? (
                        <div className="text-3xl text-orange-700 flex items-center">
                            <p>Genres list is empty!</p>
                        </div>
                    ) : (
                        <ul className="grid mt-9 gap-9 grid-cols-8 grid-flow-row">
                            {genres?.map((genre, index) => (
                                <li key={index}>
                                    <Genre title={genre.title} amount={genre.movies.length} id={genre.id} handleClick={() => {
                                        setShowModal(true)
                                        setGenreId(genre.id)
                                        setCurTitle(genre.title)
                                        setCurDescription(genre.description)
                                        setIsEdit(true)
                                    }} handleDelete={handleDelete}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    </>
}

export default GenresManager;