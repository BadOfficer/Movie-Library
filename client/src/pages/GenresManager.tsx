import { FC, useState } from "react"
import Header from "../components/parts/Header";
import Genre from "../components/genres/Genre";
import GenreModal from "../components/genres/GenreModal";
import { instance } from "../api/axios.api";
import GenreButton from "../components/genres/GenreButton";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { IGenre } from "../types/types";

export const genresAction = async({ request }: any) => {
    switch(request.method) {
        case "POST": {
            const formData = await request.formData()
            const genre = {
                title: formData.get('title'),
                description: formData.get('description')
            }
            try{
                await instance.post('/genres/create', genre);
                toast.success(`Genre ${formData.get('title')} is created!`)
            } catch(err: any) {
                const error = err.response?.data.message;
                toast.error(error.toString());
            }
            return null;
        }
        case "PATCH": {
            const formData = await request.formData();
            const genre = {
                id: formData.get('id'),
                title: formData.get('title'),
                description: formData.get('description')
            }

            try{
                await instance.patch(`genres/${genre.id}`, genre);
                toast.success(`Genre ${formData.get('title')} is updated!`)
            } catch(err: any) {
                const error = err.response?.data.message;
                toast.error(error.toString());
            }
            return null
        }
        case "DELETE": {
            const formData = await request.formData();
            const genreId = formData.get('id');
            try{
                await instance.delete(`genres/${genreId}`)
                toast.success(`Genre is deleted!`)
            } catch(err: any) {
                const error = err.response?.data.message;
                toast.error(error.toString());
            }

            return null
        }
    }
}

export const genresLoader = async () => {
    const { data } = await instance.get<IGenre[]>('/genres');

    return data
}

const GenresManager: FC = () => {
    const genres = useLoaderData() as IGenre[];
    const [showModal, setShowModal] = useState<boolean>(false); 
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [genreId, setGenreId] = useState<number>(0);
    const [curTitle, setCurTitle] = useState('');
    const [curDescription, setCurDescription] = useState('');

    return <>
        {showModal && <GenreModal setVisible={setShowModal} type="post"/>}
        {showModal && isEdit && <GenreModal setVisible={setShowModal} type="patch" id={genreId} curTitle={curTitle} curDescription={curDescription}/>}
        <div>
        <Header currentPage="Genres" />
        <div className="relatrive mt-12">
            <div className="w-full bg-light-gray py-2.5 px-6 flex justify-between items-center rounded-xl">
                <h3 className="text-xl">Actions: </h3>
                <div>
                    <GenreButton handleClick={() => setShowModal(true)}>Add genre</GenreButton>
                </div>
            </div>

            <h2 className="mt-12 text-2xl text-center uppercase font-semibold">Genres list</h2>
            <div className="flex justify-center">
                {genres.length === 0 ? (
                    <div className="mt-40 text-3xl text-orange-700">
                        <p>Genres list is empty!</p>
                    </div>
                ) : (
                <ul className="grid mt-9 gap-9 grid-cols-8 grid-flow-row">
                    {genres.map((genre, index) => (
                        <li key={index}>
                            <Genre title={genre.title} amount={genre.movies.length} id={genre.id} handleClick={() => {
                                setShowModal(true)
                                setGenreId(genre.id)
                                setCurTitle(genre.title)
                                setCurDescription(genre.description)
                                setIsEdit(true)
                            }}/>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    </div>
    </>
}

export default GenresManager;