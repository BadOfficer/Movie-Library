import { FC } from "react"
import Line from "./Line";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./parts/Navigation";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import NavButton from "./buttons/NavButton";
import { BiHomeAlt2, BiSolidMoviePlay } from "react-icons/bi";
import { FiServer } from "react-icons/fi";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings, MdVideoSettings } from "react-icons/md";
import { useRole } from "../hooks/useRole";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";

interface Props {
    liked: number;
    bookmarks: number;
}

const SideBar: FC<Props> = ({ liked, bookmarks }) => {
    const isAuth = useAuth();
    const isAdmin = useRole();
    const user = useAppSelector(state => state.user.user);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHadler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('access_token')
        toast.success('You are logged out')
        navigate('/')
    }
    

    return <div className="bg-light-gray h-dvh flex flex-col fixed min-w-72 gap-12 z-0">
                {isAuth ? (
                    <div className="flex flex-col items-center  px-[50px] pt-[35px]">
                        <div className="w-[50px] h-[50px] bg-[#D9D9D9] text-black flex justify-center items-center rounded-full">50x50</div>
                        <h2 className="text-title-1 mt-[10px]">{user?.first_name} {user?.last_name}</h2>
                    </div>
                ) : (
                    <div className="flex justify-center">
                         <img src="Logo.png" alt="logo" className="max-w-40"/>
                    </div>
                )}

                <Navigation>
                    <li>
                        <NavButton path="/">
                            <BiHomeAlt2 size={20}/>
                            <span>Home</span>
                        </NavButton>
                    </li>
                    <li>
                        <NavButton path="/movies">
                            <BiSolidMoviePlay size={20}/>
                            <span>Movies</span>
                        </NavButton>
                    </li>
                    <li>
                        <NavButton path="/series">
                            <FiServer size={20}/>
                            <span>Series</span>
                        </NavButton>
                    </li>
                </Navigation>
                
                <Line />

                {isAuth ? (
                    <>
                        <Navigation>
                            <li>
                            <NavButton path="/liked">
                                <FaRegHeart size={20}/>
                                <span className="flex-1">Liked</span>
                                <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">{liked}</span>
                            </NavButton>
                            </li>
                            <li>
                                <NavButton path="/bookmarks">
                                    <FaRegBookmark size={20}/>
                                    <span className="flex-1">Bookmarks</span>
                                    <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">{bookmarks}</span>
                                </NavButton>
                            </li>
                        </Navigation>

                        <Line />

                        <NavButton path="/profile">
                            <IoSettingsOutline size={20}/>
                            <span className="flex-1">Settings</span>
                        </NavButton>

                        <Line />

                        {isAdmin && (
                            <>
                                <Navigation>
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
                                </Navigation>

                                <Line />
                            </>
                        )}

            <button className="py-[8px] border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray mx-9" onClick={logoutHadler}>
                Logout
            </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-5">
                        <Link to={"/auth"} className="px-[25px] py-[8px] border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray">
                            Login
                        </Link>
                    </div>
                )}
            </div>
}

export default SideBar;