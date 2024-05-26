import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/parts/SideBar"
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";


const Layout: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleShowSidebar = () => {
        setIsSidebarOpen(state => !state)
    }

    return <div className="min-h-screen m-0 bg-dark-gray text-white font-inter w-full">
        {(isSidebarOpen || isDesktop) && (
            <SideBar handleActive={setIsSidebarOpen}/>
        )}
        <div className={`z-40 absolute top-6 left-6 ${isDesktop ? "hidden" : ""}`} onClick={handleShowSidebar}>
            {isSidebarOpen ? (
                <IoMdClose size={30} />
            ) : (
                <HiMenuAlt3 size={30}/>
            )}
        </div>
        <div className={`lg:ml-72 lg:pl-12 relative overflow-hidden flex flex-col min-h-screen items-center lg:pr-12 ${isSidebarOpen ? "hidden" : ""}`}>
            {/* <div className="w-[500px] h-[500px] bg-dark-yellow">

            </div> */}
            <Outlet />
        </div>
    </div>
}

export default Layout;