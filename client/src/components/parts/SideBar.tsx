import { FC, useEffect } from "react"
import Line from "./Line";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import NavButton from "../buttons/NavButton";
import { BiHomeAlt2, BiSolidMoviePlay } from "react-icons/bi";
import { FiServer } from "react-icons/fi";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings, MdVideoSettings } from "react-icons/md";
import { useRole } from "../../hooks/useRole";
import { logout } from "../../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { useGetUserQuery } from "../../services/user.service";
import { useGetLikedQuery } from "../../services/liked.service";
import { useGetBookmarksQuery } from "../../services/bookmarks.service";

interface Props {
    handleActive: (state: boolean) => void;
}

const SideBar: FC<Props> = ({ handleActive }) => {
    const isAuth = useAuth();
    const isAdmin = useRole();
    const {data: userData, refetch} = useGetUserQuery('', { skip: !isAuth });
    const {data: likedMovies} = useGetLikedQuery('', { skip: !isAuth });
    const {data: bookmarksMovies} = useGetBookmarksQuery('', { skip: !isAuth });

    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHadler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('access_token')
        toast.success('You are logged out')
        navigate('/')
    }

    const handleSetActive = () => {
        handleActive(false);
    }
    
    useEffect(() => {
        if (isAuth) {
            refetch();
        }
    }, [isAuth, refetch]);

    return <div className="overflow-auto sidebar bg-light-gray h-screen z-30 flex gap-6 flex-col fixed min-w-[18rem] 2xl:min-w-[18rem] xl:gap-9 2xl:gap-12 w-full lg:w-auto">
                {isAuth ? (
                    <div className="flex flex-col items-center px-[50px]">
                        <img src="Logo.png" alt="logo" className="max-w-28"/>
                        <h2 className="text-title-1 font-semibold">Welcome {userData?.first_name}</h2>
                    </div>
                ) : (
                    <div className="flex justify-center">
                         <img src="Logo.png" alt="logo" className="max-w-40"/>
                    </div>
                )}

                <Navigation>
                    <li>
                        <NavButton path="/" handleClick={handleSetActive}>
                            <BiHomeAlt2 size={20}/>
                            <span>Home</span>
                        </NavButton>
                    </li>
                    <li>
                        <NavButton path="/movies" handleClick={handleSetActive}>
                            <BiSolidMoviePlay size={20}/>
                            <span>Movies</span>
                        </NavButton>
                    </li>
                    <li>
                        <NavButton path="/series" handleClick={handleSetActive}>
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
                            <NavButton path="/liked" handleClick={handleSetActive}>
                                <FaRegHeart size={20}/>
                                <span className="flex-1">Liked</span>
                                <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">{likedMovies?.movies.length || 0}</span>
                            </NavButton>
                            </li>
                            <li>
                                <NavButton path="/bookmarks" handleClick={handleSetActive}>
                                    <FaRegBookmark size={20}/>
                                    <span className="flex-1">Bookmarks</span>
                                    <span className="px-2 bg-dark-yellow rounded-full text-dark-gray">{bookmarksMovies?.movies.length || 0}</span>
                                </NavButton>
                            </li>
                        </Navigation>

                        <Line />

                        <NavButton path="/profile" handleClick={handleSetActive}>
                            <IoSettingsOutline size={20}/>
                            <span className="flex-1">Settings</span>
                        </NavButton>

                        <Line />

                        {isAdmin && (
                            <>
                                <Navigation>
                                    <li>
                                        <NavButton path="movies-list" handleClick={handleSetActive}>
                                            <MdVideoSettings size={20}/>
                                            <span className="flex-1">Movies Manager</span>
                                        </NavButton>
                                    </li>
                                    <li>
                                        <NavButton path="genres" handleClick={handleSetActive}>
                                            <MdOutlineDisplaySettings size={20}/>
                                            <span className="flex-1">Genres Manager</span>
                                        </NavButton>
                                    </li>
                                </Navigation>

                                <Line />
                            </>
                        )}

            <div className="flex justify-center">
                <button className="py-2 px-6 border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray mx-9" onClick={logoutHadler}>
                    Logout
                </button>
            </div>
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