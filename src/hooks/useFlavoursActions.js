import { useAppSelector } from "./store";

export const useFlavoursActions =  () => {

    const flavours = useAppSelector((state) => state.flavours.data);
    const statusFlavours = useAppSelector((state) => state.flavours.status);
    const errorFlavours = useAppSelector((state) => state.flavours.error);

    return { flavours, statusFlavours, errorFlavours }
}