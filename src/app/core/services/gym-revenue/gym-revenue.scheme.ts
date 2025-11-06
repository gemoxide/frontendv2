import * as Yup from "yup";

export const CreateGymRevenueScheme = Yup.object().shape({
    month_year: Yup.string().required("Month Goal is required"),
    membership_revenue: Yup.string().required("Membership Revenue is required"),
    pt_revenue: Yup.string().required("PT Revenue is required"),
});
