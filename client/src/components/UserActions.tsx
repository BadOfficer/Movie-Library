import { toast } from "react-toastify";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import Line from "./Line";
import NavButton from "./buttons/NavButton";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import AdminNavigation from "./AdminNavigation";

const UserActions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHadler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('access_token')
        toast.success('You are logged out')
        navigate('/')
    }

    const isAdmin = useRole();

    return <>
            <nav className="mt-[50px]">
                <ul className="flex flex-col gap-5">
                    <li>
                        <NavButton path="/liked">
                            <FaRegHeart size={20}/>
                            <span className="flex-1">Liked</span>
                            <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">0</span>
                        </NavButton>
                    </li>
                    <li>
                        <NavButton path="/bookmarks">
                            <FaRegBookmark size={20}/>
                            <span className="flex-1">Bookmarks</span>
                            <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">0</span>
                        </NavButton>
                    </li>
                </ul>
            </nav>
            <div className="mt-12 px-[35px]">
                <Line />
            </div>

            {isAdmin && (
                <AdminNavigation />
            )}

            <div className="mt-12 px-[35px]">
                <Line />
            </div>

            <button className="px-[25px] py-[8px] border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray mx-[35px] mt-12" onClick={logoutHadler}>
                Logout
            </button>
        </>
}

export default UserActions;