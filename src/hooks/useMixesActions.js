import { useAppSelector } from "./store";

export const useUserActions =  () => {

    const mixes = useAppSelector((state) => state.mixes.data);
    const status = useAppSelector((state) => state.mixes.status);
    const error = useAppSelector((state) => state.mixes.error);

    return { mixes, status, error }
}