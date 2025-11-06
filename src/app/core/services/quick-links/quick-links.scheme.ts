import * as Yup from "yup";

export const CreateQuickLinkScheme = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    url: Yup.string()
        .required("URL is required")
        .url("Invalid URL format. Please enter a valid URL."),
});
