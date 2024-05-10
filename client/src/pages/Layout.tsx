import { FC } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout: FC = () => {

    return <div className="min-h-screen m-0 bg-dark-gray text-white">
        <SideBar />
        <div className="ml-[280px]">
            <Outlet />
        </div>
    </div>
}

export default Layout;