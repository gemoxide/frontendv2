import * as Yup from "yup";

export const CreateNoteScheme = Yup.object().shape({
    note: Yup.string().required("Note is required"),
});
