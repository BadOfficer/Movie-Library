import { FC, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IGenre } from "../../types/types";

interface Props {
    selectTitle: string;
    inputName: string;
    genres: IGenre[];
}

const GenresSelect: FC<Props> = ({ selectTitle, inputName, genres }) => {
    const [curGenresTitles, setCurGenresTitles] = useState<string[]>([]);
    const [curGenresIds, setCurGenresIds] = useState<number[]>([]);
    const [showSelect, setShowSelect] = useState<boolean>(false);

    const handleSelectGenres = (id: number, title: string) => {
        if (curGenresIds.includes(id)) {
            handleRemoveGenre(id, title);
        } else {
            handleAddGenre(id, title);
        }
    }

    const handleAddGenre = (id: number, title: string) => {
        setCurGenresIds(prevState => {
            if (!prevState.includes(id)) {
                return [...prevState, id];
            }
            return prevState;
        });

        setCurGenresTitles(prevState => {
            if (!prevState.includes(title)) {
                return [...prevState, title];
            }
            return prevState;
        });
    }

    const handleRemoveGenre = (id: number, title: string) => {
        setCurGenresIds(prevState => {
            return prevState.filter(genreId => genreId !== id);
        });

        setCurGenresTitles(prevState => {
            return prevState.filter(genreTitle => genreTitle !== title);
        });
    };

    return (
        <div className="flex gap-2.5 text-lg capitalize items-center">
            <span className="flex-1">{selectTitle}</span>
            <div className="relative">
                <div onClick={() => setShowSelect(state => !state)} className="w-full">
                    <input
                        type="text"
                        value={curGenresTitles.join(",")}
                        readOnly
                        className="text-main p-0 cursor-pointer text-dark-gray w-40 px-1 py-2 lg:min-w-96 rounded-md"
                        placeholder="Movie genres"
                    />
                    <input type="text" className="hidden" name={inputName} value={curGenresIds.join(",")} readOnly/>
                    <div className="absolute centeredY right-3">
                        <MdKeyboardArrowDown size={24} className="text-dark-gray"/>
                    </div>
                </div>
                {showSelect && (
                    <div className="absolute w-full bg-light-gray flex flex-col items-start rounded-xl max-h-32 overflow-auto">
                        {genres && genres.map(genre => (
                            <div
                                key={genre.id}
                                className={`px-3 py-1 w-full ${curGenresIds.includes(genre.id) ? "bg-dark-yellow text-dark-gray" : ""} hover:bg-dark-yellow cursor-pointer hover:text-dark-gray`}
                                onClick={() => handleSelectGenres(genre.id, genre.title)}
                            >
                                {genre.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GenresSelect;
