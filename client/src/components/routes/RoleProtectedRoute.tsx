import { FC } from "react";
import { useRole } from "../../hooks/useRole";

interface RoleProtectedRouteProps {
    children: JSX.Element
}

export const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({ children }) => {
    const isAdmin = useRole()
    return <>
        {isAdmin ? children : (
            <div className="flex flex-col justify-center items-center">
                <h3>Have not access</h3>
            </div>
        )}
    </>
}