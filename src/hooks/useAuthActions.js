import { useAppSelector } from "./store";

export const useAuthActions =  () => {

    const user = useAppSelector((state) => state.auth.userInfo);
    const userToken = useAppSelector((state) => state.auth.userToken);
    const statusAuth = useAppSelector((state) => state.auth.status);
    const errorAuth = useAppSelector((state) => state.auth.error);

    return { user, userToken, statusAuth, errorAuth }
}