import { FC } from "react"
import NavButton from "./buttons/NavButton"
import { MdVideoSettings, MdOutlineDisplaySettings } from "react-icons/md";

const AdminNavigation: FC = () => {
    return <nav className="mt-[50px]">
            <ul className="flex flex-col gap-5">
                <li>
                    <NavButton path="movies-list">
                        <MdVideoSettings size={20}/>
                        <span className="flex-1">Movies Manager</span>
                    </NavButton>
                </li>
                <li>
                    <NavButton path="genres">
                        <MdOutlineDisplaySettings size={20}/>
                        <span className="flex-1">Genres Manager</span>
                    </NavButton>
                </li>
            </ul>
        </nav>
}

export default AdminNavigation