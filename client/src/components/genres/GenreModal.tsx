import { FC, useState } from "react";
import { Form } from "react-router-dom";
import GenreButton from "./GenreButton";
import GenreCancelButton from "./GenreCancelButton";

interface Props {
    setVisible: (state: boolean) => void;
    type: "post" | "patch";
    id?: number;
    curTitle?: string | ''
    curDescription?: string | ''
}

const GenreModal: FC<Props> = ({ setVisible, type, id, curTitle, curDescription }) => {
    const [titleValue, setTitleValue] = useState(curTitle);
    const [descriptionValue, setDescriptionValue] = useState(curDescription)

    return <div className="fixed w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-dark-gray/75 z-50">
                <div className="bg-light-gray p-9 rounded-xl">
                    <Form action='/genres' method={type} className="flex flex-col gap-5" onSubmit={() => setVisible(false)}>
                        <h2 className="text-center text-xl uppercase font-semibold">Adding Genre</h2>
                        <label htmlFor="title" className="flex gap-2.5 items-center text-lg capitalize">
                            <span className="flex-1">Genre title: </span>
                            <input type="text" name="title" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Genre title" 
                                    value={titleValue}
                                    onChange={(e) => setTitleValue(e.target.value)} />
                            <input type="hidden" name="id" value={id}/>
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span>Genre description: </span>
                            <textarea name="description" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white" 
                                        placeholder="Genre description" 
                                        value={descriptionValue}
                                        onChange={(e) => setDescriptionValue(e.target.value)} />
                        </label>
                        <div className="flex justify-center gap-2.5">
                            <GenreButton type="submit">{type === 'post' ? "Add" : "Update"}</GenreButton>
                            <GenreCancelButton handleClick={() => setVisible(false)}>Cancel</GenreCancelButton>
                        </div>
                    </Form>
                </div>
            </div>
}

export default GenreModal;