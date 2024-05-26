import { FC } from "react"
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useDeleteGenreMutation } from "../../services/genres.service";
import { toast } from "react-toastify";


interface Props {
    id: number,
    title: string,
    amount: number,
    handleClick?: () => void
}

const Genre: FC<Props> = ({ title, amount, id, handleClick }) => {

    const [deleteGenre, {}] = useDeleteGenreMutation();

    const handleDelete = async(e: any) => {
        e.preventDefault();
        const {error} = await deleteGenre(id)
        if(error) {
            if ('data' in error) {
                const errorData = error.data as { message: string[] | string };
                
                if (Array.isArray(errorData.message)) {
                    errorData.message.forEach(msg => toast.error(msg));
                } else {
                    toast.error(errorData.message);
                }
            }
        }
        toast.success(`${title} has been deleted!`)
    }

    return <div className="px-4 py-2.5 bg-light-gray rounded-xl relative group min-w-32">
                <h3 className="text-white text-[20px]">{title}</h3>
                <p className="text-dark-yellow text-[14px]">{amount} {amount === 1 ? 'item' : 'items'}</p>
                <div className="absolute w-full h-full bg-light-gray top-0 left-0 rounded-xl hidden flex-col items-center justify-center group-hover:flex">
                    <button className="flex gap-2.5 hover:text-dark-yellow" onClick={handleClick}>
                        <MdOutlineModeEdit size={20}/>
                        <span>Edit</span>
                    </button>

                    <div>
                        <button className="flex gap-2.5 items-center hover:text-orange-700" onClick={(e) => handleDelete(e)}>
                            <MdDeleteOutline />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
}

export default Genre;