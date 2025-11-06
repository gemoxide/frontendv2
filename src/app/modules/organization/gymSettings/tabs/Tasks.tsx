import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import Select from "../../../../core/components/Forms/Select";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/gyms";
import { RootState } from "../../../../core/state/reducer";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PermissionType } from "../../../../core/interfaces/routes.interface";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../../core/state/reducer/users";
import { typeDropdown } from "../../../../core/constants/tasks-type";
import Textarea from "../../../../core/components/Forms/TextArea";

const Tasks = () => {
    const { id } = useParams();
    const { getGymUsers } = mapDispatchToUserProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymData, loading: getGymLoading } = useSelector(
        (state: RootState) => state.gyms.getGym
    );

    const { loading: updateGymLoading } = useSelector(
        (state: RootState) => state.gyms.updateGym
    );

    const {
        data: gymUsers,
        loading: gymUsersLoading,
        success: gymUsersSuccess,
    } = useSelector((state: RootState) => state.users.getGymUsers);

    const { getGym, updateDefaults } = mapDispatchToProps();

    useEffect(() => {
        getGym(
            currentUser?.relationships.user_gyms?.length
                ? currentUser?.relationships.user_gyms[0].id
                : parseInt(id || "")
        );
    }, [currentUser]);

    useEffect(() => {
        if (getGymData?.id) {
            getGymUsers({ gym_id: getGymData?.id });
        }
    }, [getGymData]);

    const coachOptions = useMemo(() => {
        return gymUsers?.data.map((user) => ({
            label: `${user?.attributes.first_name} ${user?.attributes.last_name}`,
            value: user.id,
        }));
    }, [gymUsers]);

    const formik = useFormik({
        initialValues: {
            id: getGymData?.id,
            default_client_onboarding_id:
                getGymData?.attributes?.default_client_onboarding_id ?? "",
            default_assessment_id:
                getGymData?.attributes?.default_assessment_id ?? "",
            default_lead_id: getGymData?.attributes?.default_lead_id ?? "",
            default_office_staff_id:
                getGymData?.attributes?.default_office_staff_id ?? "",
            default_call_id: getGymData?.attributes?.default_call_id ?? "",
            default_gym_tour_id:
                getGymData?.attributes?.default_gym_tour_id ?? "",
            default_js1_id: getGymData?.attributes?.default_js1_id ?? "",
            default_js3_id: getGymData?.attributes?.default_js3_id ?? "",
            default_note_member_onboarding:
                getGymData?.attributes.default_note_member_onboarding ?? "",
            default_note_coached_client_onboarding:
                getGymData?.attributes.default_note_coached_client_onboarding ??
                "",
        },
        enableReinitialize: true,
        // validationSchema: CreateGymScheme,
        onSubmit: async (values) => {
            updateDefaults(values);
        },
    });

    const hasUpdateGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const loading = getGymLoading || updateGymLoading;

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">
                Task Assignment Defaults
            </h1>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-3/4 h-full mt-12">
                    {typeDropdown.map(({ label, value, column }, index) => (
                        <Select
                            label={`${label} Default Assignee`}
                            name={column}
                            autoComplete
                            variant="primary"
                            options={coachOptions}
                            key={index}
                        />
                    ))}
                    <Textarea
                        name="default_note_member_onboarding"
                        label="Default Task note for: Complete New Member Onboarding Checklist"
                        placeHolder="Enter default note for completing new member onboarding checklist"
                    />
                    <Textarea
                        name="default_note_coached_client_onboarding"
                        label="Default Task note for: Complete Coached Client Onboarding Checklist"
                        placeHolder="Enter default note for completing coached client onboarding checklist"
                    />
                </Form>
                <hr className="mt-12" />
            </FormikProvider>
            <div className="flex md:justify-end py-4 w-full mt-4">
                {hasUpdateGym && (
                    <Button
                        isSubmitting={loading}
                        variant="primary"
                        label="Save Changes"
                        className={"w-full lg:w-3/12 btn-md"}
                        onClick={formik?.submitForm}
                    />
                )}
            </div>
        </div>
    );
};

export default Tasks;
