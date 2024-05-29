import { FC, useEffect, useState } from "react";
import TitledInput from "../inputs/TitledInput";
import SolidButton from "../buttons/SolidButton";
import BorderButton from "../buttons/BorderButton";
import GenresSelect from "../parts/GenresSelect";
import { useGetGenresQuery, useLazyGetGenresQuery } from "../../services/genres.service";
import CustomFileInput from "../inputs/CustomFileInput";
import { IMovieModal, IMovieUpdate } from "../../types/types";
import { useCreateMovieMutation, useUpdateMovieMutation } from "../../services/movies.service";
import Modal from "../parts/Modal";
import useHandleResponse from "../../hooks/useHandleResponse";

interface Props {
    type: 'post' | 'patch',
    movie: IMovieModal;
    setVisible: (state: boolean) => void;
    handleSetEdit?: (state: boolean) => void;
}

const MovieModal: FC<Props> = ({ type, movie, setVisible, handleSetEdit }) => {
    const [curMovie, setCurMovie] = useState(movie);
    const [triggerGetGenres] = useLazyGetGenresQuery();
    const [countGenres, setCountGenres] = useState(18)
    const { data: genresResponse } = useGetGenresQuery(`${""},${countGenres}`);
    const { handleResponse } = useHandleResponse();
    
    const [createMovie, {}] = useCreateMovieMutation();
    const [updateMovie, {}] = useUpdateMovieMutation();

    useEffect(() => {
        if (genresResponse && genresResponse.count) {
            setCountGenres(genresResponse.count);
        }
    }, [genresResponse]);

    const genres = genresResponse?.rows;

    const handleChangeMovieData = (row: string, value: string) => {
        setCurMovie(movie => ({...movie, [row]: value}))
    }
    

    const handleAddMovie = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const newFormData = new FormData();

        newFormData.append('title', formData.get('title') as string);
        newFormData.append('description', formData.get('description') as string);
        newFormData.append('release', formData.get('release') as string);
        newFormData.append('seasons', formData.get('seasons') as string);
        newFormData.append('series', formData.get('series') as string);
        newFormData.append('duration', formData.get('duration') as string);
        newFormData.append('rating', formData.get('rating') as string);
        newFormData.append('genres', formData.get('genres') as string);

        const sliderImage = formData.get('sliderImage') as File;
        const image = formData.get('image') as File;

        newFormData.append('images', sliderImage);
        newFormData.append('images', image);

        const {data, error} = await createMovie(newFormData)
        handleResponse(data, error, `${data?.title} has been added!`);

        if(data) {
            setVisible(false);
            triggerGetGenres("");
        }
    }

    const handleUpdateMovie = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        
        const newMovieData: IMovieUpdate = {
            id: Number(formData.get('id')),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            release: formData.get('release') as string,
            seasons: formData.get('seasons') as string,
            series: formData.get('series') as string,
            duration: formData.get('duration') as string,
            rating: formData.get('rating') as string,
            genres: formData.get('genres') as string,
        }        

        const {data, error} = await updateMovie(newMovieData);
        handleResponse(data, error, `${data?.title} has been updated!`);
        
        if(handleSetEdit) {
            handleSetEdit(false);
        }
        setVisible(false);
        triggerGetGenres("");
    }

    const handleCancel = () => {
        if(handleSetEdit) {
            handleSetEdit(false);
        }
        setVisible(false);
    }

    return (
        <Modal>
            <>
                {genres && (
                    <form className="flex flex-col gap-5" onSubmit={type === "post" ? handleAddMovie : handleUpdateMovie}>
                        <h2 className="text-center text-xl uppercase font-semibold">{type === 'post' ? "Adding Movie" : "Updating Movie"}</h2>
                        <TitledInput fieldLabel="Movie title:" name="title" handleChange={(e) => handleChangeMovieData("title", e.target.value)} type="text" placeholder="Movie title" value={curMovie.title} el="input" id={curMovie.id} required={true}/>
                        <TitledInput fieldLabel="Movie descrition:" name="description" handleChange={(e) => handleChangeMovieData("description", e.target.value)} placeholder="Movie description" value={curMovie.description} el="textarea" required={true}/>
                        <TitledInput fieldLabel="Movie release:" name="release" handleChange={(e) => handleChangeMovieData("release", e.target.value)} placeholder="Movie release date" value={curMovie.release} el="input" type="number" required={true}/>
                        <TitledInput fieldLabel="Movie seasons:" name="seasons" handleChange={(e) => handleChangeMovieData("seasons", e.target.value)} placeholder="Movie seasons" value={curMovie.seasons} el="input" type="number" required={true}/>
                        <TitledInput fieldLabel="Movie series:" name="series" handleChange={(e) => handleChangeMovieData("series", e.target.value)} placeholder="Movie series" value={curMovie.series} el="input" type="number" required={true}/>
                        <TitledInput fieldLabel="Movie duration:" name="duration" handleChange={(e) => handleChangeMovieData("duration", e.target.value)} placeholder="Movie duration" value={curMovie.duration} el="input" type="number" required={true}/>
                        <TitledInput fieldLabel="Movie rating:" name="rating" el="input" handleChange={(e) => handleChangeMovieData("rating", e.target.value)} placeholder="Movie rating" value={curMovie.rating} type="number" required={true}/>
                        <GenresSelect selectTitle="Movie genres:" inputName="genres" genres={genres} />
                        {type === "post" && (
                            <>
                                <CustomFileInput inputName="sliderImage" title="Movie slider image" acceptedFileTypes={[".jpg"]} />
                                <CustomFileInput inputName="image" title="Movie main image" acceptedFileTypes={[".jpg"]} />
                            </>
                        )}
                        <div className="flex justify-center gap-2.5">
                            <SolidButton type="submit">{type === 'post' ? "Add" : "Update"}</SolidButton>
                            <BorderButton type="reset" handleClick={handleCancel}>Cancel</BorderButton>
                        </div>
                    </form>
                )}
            </>
        </Modal>
    )
}

export default MovieModal;