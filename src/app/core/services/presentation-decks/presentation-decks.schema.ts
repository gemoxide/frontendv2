import * as Yup from "yup";

export const CreatePresentationDeckScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    is_active: Yup.boolean(),
    deck_type: Yup.string().required("Deck type is required"),
});
