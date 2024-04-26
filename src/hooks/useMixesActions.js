import { useAppSelector } from "./store";

export const useMixesActions =  () => {

    const mixes = useAppSelector((state) => state.mixes.data);
    const statusMixes = useAppSelector((state) => state.mixes.status);
    const errorMixes = useAppSelector((state) => state.mixes.error);

    return { mixes, statusMixes, errorMixes }
}