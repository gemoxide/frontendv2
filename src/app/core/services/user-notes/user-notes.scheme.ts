import * as Yup from "yup";

export const CreateUserNoteScheme = Yup.object().shape({
    note: Yup.string().required("Note is required"),
});
