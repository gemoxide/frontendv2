export const convertStringToBoolean = (string: string) => {
    if (string === "true") {
        return true;
    } else if (string === "false") {
        return false;
    }
};