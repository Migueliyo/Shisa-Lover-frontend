import { useAppSelector } from "./store";

export const useUsersActions =  () => {

    const users = useAppSelector((state) => state.users.data);
    const statusUsers = useAppSelector((state) => state.users.status);
    const errorUsers = useAppSelector((state) => state.users.error);

    return { users, statusUsers, errorUsers }
}