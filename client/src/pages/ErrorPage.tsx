import { FC } from "react";
import SolidLink from "../components/buttons/SolidLink";

const ErrorPage: FC = () => {
    return <div className="relative w-full h-screen bg-dark-gray">
        <div className="flex flex-col items-center justify-center gap-9 h-full z-10 absolute centered">
            <span className="block text-6xl">
            😣
            </span>
            <h2 className="text-xl font-semibold text-light-yellow">Ooooups, page not found!</h2>
            <SolidLink path="/">Back to homepage</SolidLink>
        </div>
        <div className="absolute centered text-[600px] font-bold text-light-gray z-0">
            404
        </div>
    </div>
}

export default ErrorPage;