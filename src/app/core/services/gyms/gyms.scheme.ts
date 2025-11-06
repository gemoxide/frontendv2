import * as Yup from "yup";

export const CreateGymScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    team_member_review_cadence: Yup.number().positive(
        "Team member review cadence must be at least 1"
    ),
    new_members_per_month: Yup.number().positive(
        "members per month must be at least 1"
    ),
    monthly_jsi_booked: Yup.number().positive(
        "Monthly JS1 booked must be at least 1"
    ),
    leads_to_gym_tours_percent: Yup.number()
        .min(0, "Leads to gym tours % must be at least 0")
        .max(100, "Leads to gym tours % must be at most 100"),
    membership_close_rate_percent: Yup.number()
        .min(0, "Membership close rate % must be at least 0")
        .max(100, "Membership close rate % must be at most 100"),
    js1_fc_booked_percent: Yup.number()
        .min(0, "JS1's/FC's booked % must be at least 0")
        .max(100, "JS1's/FC's booked % must be at most 100"),
    js3_fc_close_rate_percent: Yup.number()
        .min(0, "JS3's/FC's close rate % must be at least 0")
        .max(100, "JS3's/FC's close rate % must be at most 100"),
    membership_attrition_rate_percent: Yup.number()
        .min(0, "Membership attrition rate % must be at least 0")
        .max(100, "Membership attrition rate % must be at most 100"),
    pt_retention_rate_percent: Yup.number()
        .min(0, "PT retention rate % must be at least 0")
        .max(100, "PT retention rate % must be at most 100"),
    new_leads_per_month: Yup.number().positive(
        "New leads per month must be at least 1"
    ),
    cancelled_members_per_month: Yup.number().positive(
        "Cancelled members per month must be at least 1"
    ),
    new_pt_per_month: Yup.number().positive(
        "New PT per month must be at least 1"
    ),
});

export const CreateBenchMarkScheme = Yup.object().shape({
    js1_fc_booked_percent: Yup.number()
        .min(0, "JS1's/FC's booked % must be at least 0")
        .max(100, "JS1's/FC's booked % must be at most 100"),
    js3_fc_close_rate_percent: Yup.number()
        .min(0, "JS3's/FC's close rate % must be at least 0")
        .max(100, "JS3's/FC's close rate % must be at most 100"),
    leads_to_gym_tours_percent: Yup.number()
        .min(0, "Leads to gym tours % must be at least 0")
        .max(100, "Leads to gym tours % must be at most 100"),
    membership_close_rate_percent: Yup.number()
        .min(0, "Membership close rate % must be at least 0")
        .max(100, "Membership close rate % must be at most 100"),
    prospect_to_lead_rate: Yup.number()
        .min(0, "Prospect to lead rate must be at least 0")
        .max(100, "Prospect to lead rate must be at most 100"),
    js1_show_rate_percent: Yup.number()
        .min(0, "JS1 show rate % must be at least 0")
        .max(100, "JS1 show rate % must be at most 100"),
    js3_show_rate_percent: Yup.number()
        .min(0, "JS3 show rate % must be at least 0")
        .max(100, "JS3 show rate % must be at most 100"),
});

export const CreateGoalsScheme = Yup.object().shape({
    new_pt_per_month: Yup.number().positive(
        "New PT per month must be at least 1"
    ).typeError("New PT per month is required"),
    new_members_per_month: Yup.number().positive(
        "members per month must be at least 1"
    ).typeError("Members per month is required"),
    monthly_jsi_booked: Yup.number().positive(
        "Monthly JS1 booked must be at least 1"
    ).typeError("Monthly JS1 booked is required"),
    cancelled_members_per_month: Yup.number().positive(
        "Cancelled members per month must be at least 1"
    ).typeError("Cancelled members per month is required"),
    new_leads_per_month: Yup.number().positive(
        "New leads per month must be at least 1"
    ).typeError("New leads per month is required"),
    membership_attrition_rate_percent: Yup.number()
        .min(0, "Membership attrition rate % must be at least 0")
        .max(100, "Membership attrition rate % must be at most 100").nullable(),
    pt_retention_rate_percent: Yup.number()
        .min(0, "PT retention rate % must be at least 0")
        .max(100, "PT retention rate % must be at most 100").nullable(),

    //

    // js1_fc_booked_percent: Yup.number()
    //     .min(0, "JS1's/FC's booked % must be at least 0")
    //     .max(100, "JS1's/FC's booked % must be at most 100"),
    // js3_fc_close_rate_percent: Yup.number()
    //     .min(0, "JS3's/FC's close rate % must be at least 0")
    //     .max(100, "JS3's/FC's close rate % must be at most 100"),
    // leads_to_gym_tours_percent: Yup.number()
    //     .min(0, "Leads to gym tours % must be at least 0")
    //     .max(100, "Leads to gym tours % must be at most 100"),
    // membership_close_rate_percent: Yup.number()
    //     .min(0, "Membership close rate % must be at least 0")
    //     .max(100, "Membership close rate % must be at most 100"),
    // prospect_to_lead_rate: Yup.number()
    //     .min(0, "Prospect to lead rate must be at least 0")
    //     .max(100, "Prospect to lead rate must be at most 100"),
    js1_show_rate_percent: Yup.number()
        .min(0, "JS1 show rate % must be at least 0")
        .max(100, "JS1 show rate % must be at most 100").nullable(),
    js3_show_rate_percent: Yup.number()
        .min(0, "JS3 show rate % must be at least 0")
        .max(100, "JS3 show rate % must be at most 100").nullable(),
});
