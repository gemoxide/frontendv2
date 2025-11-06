import * as Yup from "yup";

export const CreateGymImportHistoryScheme = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
});
