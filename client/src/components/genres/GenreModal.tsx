import { FC, useState } from "react";
import { IGenreInput } from "../../types/types";
import TitledInput from "../inputs/TitledInput";
import SolidButton from "../buttons/SolidButton";
import BorderButton from "../buttons/BorderButton";

interface Props {
    setVisible: (state: boolean) => void;
    type: "post" | "patch";
    id?: number;
    curTitle?: string
    curDescription?: string
    handleClick?: (genre: IGenreInput, e: React.FormEvent<HTMLFormElement>) => void
    setEditState: (state: boolean) => void;
}

const GenreModal: FC<Props> = ({ setVisible, type, id, curTitle, curDescription, handleClick = () => {}, setEditState }) => {
    const [titleValue, setTitleValue] = useState<string>(curTitle || '');
    const [descriptionValue, setDescriptionValue] = useState<string>(curDescription || '');

    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
           title: formData.get('title') as string,
           description: formData.get('description') as string 
        };
        handleClick(genre, event);
        handleReset()
        setEditState(false);
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
            id: +formData.get('id')!,
            title: formData.get('title') as string,
            description: formData.get('description') as string 
        }
        handleClick(genre, event);
        handleReset()
        setEditState(false);
    }

    const handleReset = () => {
        setTitleValue('');
        setDescriptionValue('');
        setVisible(false);
        setEditState(false);
    }

    return <div className="fixed w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-dark-gray/75 z-50">
                <div className="bg-light-gray p-3 rounded-xl sm:p-9">
                    <form className="flex flex-col gap-5" onSubmit={type === "post" ? handleAdd : handleUpdate}>
                        <h2 className="text-center text-xl uppercase font-semibold">Adding Genre</h2>
                        <TitledInput fieldLabel="Genre title:" name="title" handleChange={(e) => setTitleValue(e.target.value)} type="text" placeholder="Genre title" value={titleValue} 
                                        id={id} el="input" />
                                        
                        <TitledInput fieldLabel="Genre description" el="textarea" name="description" handleChange={(e) => setDescriptionValue(e.target.value)} 
                                        placeholder="Genre description" value={descriptionValue} />

                        <div className="flex justify-center gap-2.5">
                            <SolidButton type="submit">{type === 'post' ? "Add" : "Update"}</SolidButton>
                            <BorderButton handleClick={handleReset} type="reset">Cancel</BorderButton>
                        </div>
                    </form>
                </div>
            </div>
}

export default GenreModal;