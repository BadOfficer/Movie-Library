import { FC, useState } from "react";
import GenreButton from "./GenreButton";
import GenreCancelButton from "./GenreCancelButton";
import { IGenreInput } from "../../types/types";

interface Props {
    setVisible: (state: boolean) => void;
    type: "post" | "patch";
    id?: number;
    curTitle?: string
    curDescription?: string
    handleClick?: (genre: IGenreInput) => void
}

const GenreModal: FC<Props> = ({ setVisible, type, id, curTitle, curDescription, handleClick = () => {} }) => {
    const [titleValue, setTitleValue] = useState(curTitle || '');
    const [descriptionValue, setDescriptionValue] = useState(curDescription || '')

    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
           title: formData.get('title') as string,
           description: formData.get('description') as string 
        };
        handleClick(genre);
        setVisible(false)
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
            id: +formData.get('id')!,
            title: formData.get('title') as string,
            description: formData.get('description') as string 
        }
        handleClick(genre);
        setVisible(false)
    }

    return <div className="fixed w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-dark-gray/75 z-50">
                <div className="bg-light-gray p-9 rounded-xl">
                    <form className="flex flex-col gap-5" onSubmit={type === "post" ? handleAdd : handleUpdate}>
                        <h2 className="text-center text-xl uppercase font-semibold">Adding Genre</h2>
                        <label htmlFor="title" className="flex gap-2.5 items-center text-lg capitalize">
                            <span className="flex-1">Genre title: </span>
                            <input type="text" name="title" className="text-main p-0 text-dark-gray px-2.5 py-2 min-w-96 rounded-md"
                                    placeholder="Genre title" 
                                    value={titleValue}
                                    onChange={(e) => setTitleValue(e.target.value)} />
                            <input type="hidden" name="id" value={id}/>
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span>Genre description: </span>
                            <textarea name="description" className="text-main p-0 text-dark-gray px-2.5 py-2 min-w-96 rounded-md min-h-48 resize-none" 
                                        placeholder="Genre description" 
                                        value={descriptionValue}
                                        onChange={(e) => setDescriptionValue(e.target.value)} />
                        </label>
                        <div className="flex justify-center gap-2.5">
                            <GenreButton type="submit">{type === 'post' ? "Add" : "Update"}</GenreButton>
                            <GenreCancelButton handleClick={() => setVisible(false)} type="reset">Cancel</GenreCancelButton>
                        </div>
                    </form>
                </div>
            </div>
}

export default GenreModal;