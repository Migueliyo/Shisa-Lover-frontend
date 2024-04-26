import { useAppSelector } from "./store";

export const useEntriesActions =  () => {

    const entries = useAppSelector((state) => state.entries.data);
    const statusEntries = useAppSelector((state) => state.entries.status);
    const errorEntries = useAppSelector((state) => state.entries.error);

    return { entries, statusEntries, errorEntries }
}