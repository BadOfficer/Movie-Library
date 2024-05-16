import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar"
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useLikedCount } from "../hooks/useLikedCount";
import { useBookmarksCount } from "../hooks/useBookmarksCount";


const Layout: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const likedCount = useLikedCount();
    const bookmarksCount = useBookmarksCount();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleShowSidebar = () => {
        setIsSidebarOpen(state => !state)
    }

    return <div className="min-h-screen m-0 bg-dark-gray text-white font-inter">
        {(isSidebarOpen || isDesktop) && (
            <SideBar liked={likedCount} bookmarks={bookmarksCount}/>
        )}
        <div className="z-10 absolute top-2.5 left-2.5 hidden" onClick={handleShowSidebar}>
            {isSidebarOpen ? (
                <IoMdClose size={30} />
            ) : (
                <HiMenuAlt3 size={30}/>
            )}
        </div>
        <div className="ml-72 pl-12 container relative overflow-hidden flex flex-col min-h-screen">
            <Outlet />
        </div>
    </div>
}

export default Layout;