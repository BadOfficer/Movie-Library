import { FC, useState } from "react";
import TitledInput from "../inputs/TitledInput";
import SolidButton from "../buttons/SolidButton";
import BorderButton from "../buttons/BorderButton";
import Modal from "../parts/Modal";
import useHandleResponse from "../../hooks/useHandleResponse";
import { useCreateGenreMutation, useUpdateGenreMutation } from "../../services/genres.service";

interface Props {
    setVisible: (state: boolean) => void;
    type: "post" | "patch";
    id?: number;
    curTitle?: string
    curDescription?: string
    setEditState: (state: boolean) => void;
}

const GenreModal: FC<Props> = ({ setVisible, type, id, curTitle, curDescription, setEditState }) => {
    const [titleValue, setTitleValue] = useState<string>(curTitle || '');
    const [descriptionValue, setDescriptionValue] = useState<string>(curDescription || '');

    const { handleResponse } = useHandleResponse();

    const [createGenre, {}] = useCreateGenreMutation();
    const [updateGenre, {}] = useUpdateGenreMutation();

    const handleAddGenre = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
           title: formData.get('title') as string,
           description: formData.get('description') as string 
        };
        const {data, error} = await createGenre(genre);
        handleResponse(data, error, `${data?.title} has been added!`)

        if(data) {
            setVisible(false);
        }
    }

    const handleUpdateGenre = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const genre = {
            id: +formData.get('id')!,
            title: formData.get('title') as string,
            description: formData.get('description') as string 
        }
        
        const {data, error} = await updateGenre(genre);
        handleResponse(data, error, `${data?.title} has been updated!`)

        setEditState(false);
        if(data) {
            setVisible(false);
        }
    }

    const handleCancel = () => {
        setVisible(false);
        setEditState(false);
    }

    return (
        <Modal>
            <form className="flex flex-col gap-5" onSubmit={type === "post" ? handleAddGenre : handleUpdateGenre}>
                <h2 className="text-center text-xl uppercase font-semibold">{type === 'post' ? "Adding" : "Updating"} Genre</h2>
                <TitledInput fieldLabel="Genre title:" name="title" handleChange={(e) => setTitleValue(e.target.value)} type="text" placeholder="Genre title" value={titleValue} 
                                id={id} el="input" required={true}/>
                                
                <TitledInput fieldLabel="Genre description" el="textarea" name="description" handleChange={(e) => setDescriptionValue(e.target.value)} 
                                placeholder="Genre description" value={descriptionValue} required={true} />
                <div className="flex justify-center gap-2.5">
                    <SolidButton type="submit">{type === 'post' ? "Add" : "Update"}</SolidButton>
                    <BorderButton handleClick={handleCancel} type="reset">Cancel</BorderButton>
                </div>
            </form>
        </Modal>
    )
}

export default GenreModal;