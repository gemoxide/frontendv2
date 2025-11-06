import { useEffect, useMemo, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToGymProps } from "../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../core/state/reducer/users";
import { IMember } from "../../../core/interfaces/members.interface";
import Select from "../../../core/components/Forms/Select";
import { genderDropdown } from "../../../core/constants/gender";
import { saleStatusDropdown } from "../../../core/constants/sale-status";
import { contactStatusDropdown } from "../../../core/constants/contact-status";
import Checkbox from "../../../core/components/Forms/CheckBox";
import { memberTypeDropdown } from "../../../core/constants/member-type";
import { CreateMemberSchema } from "../../../core/services/members/members.schema";
import { leadSourceDropdown } from "../../../core/constants/lead-source";
import { getCurrentDate } from "../../../core/services/utils/utils.service";

type Props = {
    selectedMember?: IMember;
    type?: "Member" | "Lead";
};

const CreateMemberForm: React.FC<Props> = ({
    selectedMember,
    type = "Member",
}) => {
    const { createMember, updateMember } = mapDispatchToProps();
    const { getGymUsers } = mapDispatchToUserProps();
    const { getGyms } = mapDispatchToGymProps();

    const { loading: createMemberLoading } = useSelector(
        (state: RootState) => state.members.createMember
    );

    const { loading: updateMemberLoading } = useSelector(
        (state: RootState) => state.members.updateMember
    );

    const { data: getGymsData, loading: getGymsLoading } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { data: getUsersData, loading: getUsersLoading } = useSelector(
        (state: RootState) => state.users.getGymUsers
    );

    const fetch = async () => {
        getGyms({
            page: 1,
            per_page: 1000,
        });
    };

    useEffect(() => {
        if (selectedMember) {
            fetchUsers(selectedMember?.relationships?.gym?.id);
        }
    }, [selectedMember]);

    const fetchUsers = async (id: string) => {
        getGymUsers({
            gym_id: id,
        });
    };

    useEffect(() => {
        if (!!!getGymsData) fetch();
    }, []);

    const formik = useFormik({
        initialValues: {
            id: selectedMember?.id || "",
            first_name: selectedMember?.attributes?.first_name || "",
            last_name: selectedMember?.attributes?.last_name || "",
            email_address: selectedMember?.attributes?.email_address || "",
            gender: selectedMember?.attributes?.gender || "",
            sales_status: selectedMember?.attributes?.sales_status || "yes",
            contact_status: selectedMember?.attributes?.contact_status || "",
            opt_in_to_use_photo:
                selectedMember?.attributes?.opt_in_to_use_photo || false,
            lead_source: selectedMember?.attributes?.lead_source || "manual",
            cell_phone: selectedMember?.attributes?.cell_phone || "",
            gym_id: selectedMember?.relationships?.gym?.id || "",
            type: selectedMember?.attributes?.type || null,
            user_id: selectedMember?.relationships?.user?.id || null,
            birthday: selectedMember?.attributes?.birthday || "",
            nickname: selectedMember?.attributes?.nickname || "",
            js1_schedule_date:
                selectedMember?.attributes?.js1_schedule_date || "",
            js3_schedule_date:
                selectedMember?.attributes?.js3_schedule_date || "",
            lead_acquired_at:
                selectedMember?.attributes?.lead_acquired_at || "",
            gym_tour_at: selectedMember?.attributes?.gym_tour_at || "",
        },
        validationSchema: CreateMemberSchema,
        onSubmit: async (values) => {
            if (selectedMember?.id) updateMember(values);
            else createMember(values);
        },
    });

    useEffect(() => {
        if (formik.values.gym_id) {
            fetchUsers(formik.values.gym_id);
        }
    }, [formik.values.gym_id]);

    const gymOptions = useMemo(() => {
        return (
            getGymsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getGymsData]);

    const gymUsersOptions = useMemo(() => {
        return (
            getUsersData?.data?.map((val) => {
                return {
                    label: `${val?.attributes?.first_name} ${val?.attributes?.last_name}`,
                    value: val?.id,
                };
            }) || []
        );
    }, [getUsersData]);

    const loading =
        createMemberLoading || updateMemberLoading || getGymsLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedMember?.id ? `Update ${type}` : `Add ${type}`}
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
                    {type === "Member" && (
                        <Select
                            label="Type"
                            name="type"
                            placeHolder="Select Type"
                            autoComplete
                            variant="default"
                            options={memberTypeDropdown}
                        />
                    )}
                    <Select
                        label="Location"
                        name="gym_id"
                        placeHolder="Select Location"
                        autoComplete
                        variant="default"
                        options={gymOptions}
                    />
                    {type === "Member" && (
                        <Select
                            label="Coach"
                            name="user_id"
                            placeHolder="Select Coach"
                            autoComplete
                            variant="default"
                            options={gymUsersOptions}
                        />
                    )}
                    <Input
                        label="Lead Acquired Date"
                        name="lead_acquired_at"
                        type="date"
                        placeHolder="Lead Acquired Date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Gym Tour Date"
                        name="gym_tour_at"
                        type="date"
                        placeHolder="Gym Tour Date"
                        autoComplete
                        disabled={loading}
                        variant="default"
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
                        name="opt_in_to_use_photo"
                        label={"Allow photo use"}
                        checked={formik?.values?.opt_in_to_use_photo || false}
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

export default CreateMemberForm;
