import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
    children: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = useAuth()
    return <>
        {isAuth ? children : (
            <div className="flex flex-col justify-center items-center">
                <h3>Have not access</h3>
            </div>
        )}
    </>
}