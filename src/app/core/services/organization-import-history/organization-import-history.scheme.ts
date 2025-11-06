import * as Yup from "yup";

export const CreateOrganizationImportHistoryScheme = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
});
