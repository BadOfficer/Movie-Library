import Line from "./Line";
import NavButton from "./buttons/NavButton";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";

const UserActions = () => {
    return <>
            <nav className="mt-[50px]">
                <ul className="flex flex-col gap-5">
                    <NavButton path="/liked">
                        <FaRegHeart size={20}/>
                        <span className="flex-1">Liked</span>
                        <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">0</span>
                    </NavButton>
                    <NavButton path="/bookmarks">
                        <FaRegBookmark size={20}/>
                        <span className="flex-1">Bookmarks</span>
                        <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">0</span>
                    </NavButton>
                </ul>
            </nav>
            <div className="mt-12 px-[35px]">
                <Line />
            </div>
        </>
}

export default UserActions;