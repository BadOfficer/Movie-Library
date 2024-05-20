import { FC } from "react";

interface Props {
    type: 'post' | 'patch',
}

const MovieModal: FC<Props> = ({ type }) => {

    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const movie = Object.fromEntries(formData);

        console.log(movie);
        
    }

    return <div className="fixed w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-dark-gray/75 z-50">
                <div className="bg-light-gray p-9 rounded-xl">
                    <form className="flex flex-col gap-5" onSubmit={handleAdd} encType="multipart/form-data">
                        <h2 className="text-center text-xl uppercase font-semibold">{type === 'post' ? "Adding Movie" : "Updating Movie"}</h2>
                        <label htmlFor="title" className="flex gap-2.5 items-center text-lg capitalize">
                            <span className="flex-1">Movie title: </span>
                            <input type="text" name="title" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie title" />
                            <input type="hidden" name="id"/>
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie description: </span>
                            <textarea name="description" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white" 
                                        placeholder="Movie description"/>
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span>Movie release year: </span>
                            <input type="text" name="release" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie release year" />
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie seasons: </span>
                            <input type="text" name="seasons" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie seasons" />
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie series: </span>
                            <input type="text" name="series" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie series" />
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie duration: </span>
                            <input type="text" name="duration" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie duration" />
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie rating: </span>
                            <input type="text" name="rating" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie rating" />
                        </label>
                        <label htmlFor="description" className="flex gap-2.5 items-start text-lg capitalize">
                            <span className="flex-1">Movie genres: </span>
                            <input type="text" name="genres" className="w-80 text-lg border-2 border-dark-yellow bg-transparent outline-0 focus:border-dark-yellow rounded-xl text-white"
                                    placeholder="Movie genres" />
                        </label>
                        <input type="file" multiple name="images[]"/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
}

export default MovieModal;