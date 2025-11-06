import { useEffect, useMemo } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToGymProps } from "../../../core/state/reducer/gyms";
import { IMember } from "../../../core/interfaces/members.interface";
import Select from "../../../core/components/Forms/Select";
import { genderDropdown } from "../../../core/constants/gender";
import { CreateMemberLeadSchema } from "../../../core/services/members/members.schema";
import { leadSourceDropdown } from "../../../core/constants/lead-source";
import { getCurrentDate } from "../../../core/services/utils/utils.service";
import Checkbox from "../../../core/components/Forms/CheckBox";
import { contactStatusDropdown } from "../../../core/constants/contact-status";

type Props = {
    selectedMember?: IMember;
};

const CreateMemberLeadForm: React.FC<Props> = ({ selectedMember }) => {
    const { createMemberLead, updateMemberLead } = mapDispatchToProps();
    const { getGyms } = mapDispatchToGymProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { loading: createMemberLoading } = useSelector(
        (state: RootState) => state.members.createMemberLead
    );

    const { loading: updateMemberLoading } = useSelector(
        (state: RootState) => state.members.updateMemberLead
    );

    const { data: getGymsData, loading: getGymsLoading } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const fetch = async () => {
        getGyms({
            page: 1,
            per_page: 1000,
        });
    };

    useEffect(() => {
        if (!currentUser?.relationships.user_gyms?.length && !!!getGymsData)
            fetch();
    }, [currentUser]);

    const formik = useFormik({
        initialValues: {
            id: selectedMember?.id || "",
            first_name: selectedMember?.attributes?.first_name || "",
            last_name: selectedMember?.attributes?.last_name || "",
            email_address: selectedMember?.attributes?.email_address || "",
            gender: selectedMember?.attributes?.gender || "",
            lead_source: selectedMember?.attributes?.lead_source || "",
            lead_acquired_at:
                selectedMember?.attributes?.lead_acquired_at || "",
            cell_phone: selectedMember?.attributes?.cell_phone || "",
            gym_id:
                selectedMember?.relationships?.gym?.id ||
                (!currentUser?.relationships.user_gyms?.length
                    ? ""
                    : currentUser?.relationships.user_gyms[0].id),
            gym_tour_at: selectedMember?.attributes?.gym_tour_at,
            birthday: selectedMember?.attributes?.birthday || "",
            nickname: selectedMember?.attributes?.nickname || "",
            is_employer_paying_dues:
                selectedMember?.attributes?.is_employer_paying_dues || false,
            agreed_to_become_a_member:
                selectedMember?.attributes?.agreed_to_become_a_member || false,
            agreed_to_become_a_coached_client:
                selectedMember?.attributes?.agreed_to_become_a_coached_client ||
                false,
            js1_schedule_date:
                selectedMember?.attributes?.js1_schedule_date || "",
            js3_schedule_date:
                selectedMember?.attributes?.js3_schedule_date || "",
            contact_status: selectedMember?.attributes?.contact_status || "",
        },
        validationSchema: CreateMemberLeadSchema,
        onSubmit: async (values) => {
            values.lead_acquired_at = values.lead_acquired_at;
            values.gym_tour_at = values?.gym_tour_at || "";
            values.birthday = values.birthday;
            values.js1_schedule_date = values.js1_schedule_date;
            values.js3_schedule_date = values.js3_schedule_date;
            if (selectedMember?.id) updateMemberLead(values);
            else createMemberLead(values);
        },
    });

    const gymOptions = useMemo(() => {
        return (
            getGymsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getGymsData]);

    const loading =
        createMemberLoading || updateMemberLoading || getGymsLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedMember?.id ? "Update Lead" : "Add Lead"}
                    </h1>
                    <Input
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeHolder="First Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeHolder="Last Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Nickname"
                        name="nickname"
                        type="text"
                        placeHolder="Nickname"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Cell Phone"
                        name="cell_phone"
                        type="tel"
                        placeHolder="Cell Phone"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        value={formik.values.cell_phone}
                        onValueChange={(val) =>
                            formik.setFieldValue("cell_phone", val)
                        }
                    />
                    <Input
                        label="Email"
                        name="email_address"
                        type="text"
                        placeHolder="Email"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        label="Gender"
                        name="gender"
                        placeHolder="Select Gender"
                        autoComplete
                        variant="default"
                        options={genderDropdown}
                    />
                    <Input
                        label="Birthday"
                        name="birthday"
                        type="date"
                        placeHolder="Birthday"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        max={getCurrentDate()}
                    />
                    <Select
                        label="Contact Status"
                        name="contact_status"
                        placeHolder="Select Contact Status"
                        autoComplete
                        variant="default"
                        options={contactStatusDropdown}
                    />
                    <Select
                        label="Lead Source"
                        name="lead_source"
                        placeHolder="Select Lead Source"
                        autoComplete
                        variant="default"
                        options={leadSourceDropdown}
                    />
                    <Input
                        label="Lead acquired date"
                        name="lead_acquired_at"
                        type="date"
                        placeHolder="Lead acquired date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        min={""}
                        max={getCurrentDate()}
                    />
                    {!currentUser?.relationships.user_gyms?.length && (
                        <Select
                            label="Location"
                            name="gym_id"
                            placeHolder="Select Location"
                            autoComplete
                            variant="default"
                            options={gymOptions}
                        />
                    )}
                    <Input
                        label="Gym tour date"
                        name="gym_tour_at"
                        type="date"
                        placeHolder="Tour date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        // min={getCurrentDate()}
                    />
                    <Input
                        label="JS1 Schedule Date"
                        name="js1_schedule_date"
                        type="date"
                        placeHolder="JS1 Schedule Date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="JS3 Schedule Date"
                        name="js3_schedule_date"
                        type="date"
                        placeHolder="JS3 Schedule Date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Checkbox
                        name="is_employer_paying_dues"
                        label={"Employer Paid Dues"}
                        checked={
                            formik?.values?.is_employer_paying_dues || false
                        }
                    />
                    <Checkbox
                        name="agreed_to_become_a_member"
                        label={"Agreed to become a member"}
                        checked={
                            formik?.values?.agreed_to_become_a_member || false
                        }
                    />
                    <Checkbox
                        name="agreed_to_become_a_coached_client"
                        label={"Agreed to become a coached client"}
                        checked={
                            formik?.values?.agreed_to_become_a_coached_client ||
                            false
                        }
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateMemberLeadForm;
