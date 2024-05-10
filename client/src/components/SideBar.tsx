import { FC } from "react"
import Line from "./Line";
import { Link } from "react-router-dom";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import { useAuth } from "../hooks/useAuth";

const SideBar: FC = () => {
    const isAuth = useAuth();

    return <div className="bg-light-gray h-dvh flex flex-col fixed min-w-[280px]">
                {isAuth ? (
                    <div className="flex flex-col items-center  px-[50px] pt-[35px]">
                        <div className="w-[50px] h-[50px] bg-[#D9D9D9] text-black flex justify-center items-center rounded-full">50x50</div>
                        <h2 className="text-title-1 mt-[10px]">Firstname Lastname</h2>
                    </div>
                ) : (
                    <div className="flex justify-center">
                         <img src="Logo.png" alt="logo" className="max-w-40"/>
                    </div>
                )}

                <Navigation />
                
                <div className="mt-12 px-[35px]">
                    <Line />
                </div>

                {isAuth ? (
                    <UserActions />
                ) : (
                    <div className="flex flex-col items-center mt-12 gap-5">
                        <Link to={"/auth"} className="px-[25px] py-[8px] border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray">
                            Login
                        </Link>
                    </div>
                )}
            </div>
}

export default SideBar;