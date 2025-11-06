import * as Yup from "yup";

export const CreateMemberPresentationDeckScheme = Yup.object().shape({
    presentation_deck_id: Yup.string().required(
        "Presentation deck is required"
    ),
});
