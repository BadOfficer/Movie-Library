import { useAppSelector } from "../store/hooks"

export const useRole = (): boolean => {
    const role = useAppSelector((state) => state.user.user?.role);

    if(role === 'admin') {
        return true;
    }

    return false;
}