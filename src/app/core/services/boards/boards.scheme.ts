import * as Yup from "yup";

export const CreateBoardScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    slide_delay: Yup.number().min(0, "Slide delay is at least 0 seconds"),
    slide_transition: Yup.string().required("Slide transition is required"),
    ratio_format: Yup.string().required("Ratio format is required"),
    types: Yup.array().min(1, "Select at least 1 type"),
    photos_in_between: Yup.number().min(0, "Number should be not less than 0"),
});
