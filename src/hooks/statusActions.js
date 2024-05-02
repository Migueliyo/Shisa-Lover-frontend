export const statusActions = () => {
    
    const INITIAL_STATUS = "idle";
    const PENDING_STATUS = "loading";
    const FULLFILLED_STATUS = "succeeded";
    const REJECTED_STATUS = "failed";

    return { INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } ;
}
