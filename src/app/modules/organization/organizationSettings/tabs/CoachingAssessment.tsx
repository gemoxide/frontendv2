import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/settings";
import { mapDispatchToProps as mapDispatchToPropsOrganizations } from "../../../../core/state/reducer/organizations";
import { RootState } from "../../../../core/state/reducer";
import { Fragment, useEffect, useMemo } from "react";
import Checkbox from "../../../../core/components/Forms/CheckBox";
import CheckBoxLoader from "../../../../core/components/Forms/CheckBox/CheckBoxLoader";
import Input from "../../../../core/components/Forms/Input";
import { CoachingAssessmentUpdateScheme } from "../../../../core/services/organizations/organizations.schema";

const CoachingAssessment = () => {
    const { getSettings } = mapDispatchToProps();
    const { updateOrganizationCoachAssessment } =
        mapDispatchToPropsOrganizations();

    useEffect(() => {
        getSettings();
    }, []);

    const { data: settingsData, loading: settingsLoading } = useSelector(
        (state: RootState) => state.settings.getSettings
    );

    const { data: getOrganizationData, loading: getOrganizationLoading } =
        useSelector((state: RootState) => state.organizations.getOrganization);

    const {
        loading: updateOrganizationCoachAssessmentLoading,
        success: updateOrganizationLeadManagementSuccess,
    } = useSelector(
        (state: RootState) =>
            state.organizations.updateOrganizationCoachAssessment
    );

    const loading =
        getOrganizationLoading ||
        settingsLoading ||
        updateOrganizationCoachAssessmentLoading;

    const formik = useFormik({
        initialValues: {
            coaching_assessment_frequency:
                getOrganizationData?.attributes
                    ?.coaching_assessment_frequency || undefined,
            coaching_assessment_data:
                getOrganizationData?.attributes?.coaching_assessment_data || [],
        },
        enableReinitialize:
            getOrganizationLoading ||
            settingsLoading ||
            updateOrganizationLeadManagementSuccess,
        validationSchema: CoachingAssessmentUpdateScheme,
        onSubmit: async (values) => {
            updateOrganizationCoachAssessment(values);
        },
    });

    const assessmentDataList = useMemo(() => {
        if (settingsData?.lead_management_actions)
            return Object.entries(
                settingsData.coaching_assessment_data_options
            ).map(([value, label]) => ({ value, label }));
        else return [];
    }, [settingsData?.lead_management_actions]);

    const handleOnChangeStep = (value: string) => {
        const array = [...formik.values?.coaching_assessment_data] || [];
        if (value) {
            if (array.includes(value)) {
                const index = array.indexOf(value);
                if (index > -1) array.splice(index, 1);
            } else array.push(value);

            formik.setFieldValue("coaching_assessment_data", array);
        }
    };

    const RenderLoader = () => {
        return (
            <div>
                <CheckBoxLoader />
                <CheckBoxLoader />
                <CheckBoxLoader />
                <CheckBoxLoader />
                <CheckBoxLoader />
                <CheckBoxLoader />
            </div>
        );
    };

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">
                Coaching Assessments
            </h1>
            <h2 className="mt-4 text-grey-tertiary">
                Select the number of onboarding steps and what actions are
                triggered for each step
            </h2>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-1/2 h-full mt-4">
                    <div className="relative flex ">
                        <Input
                            label="Frequency"
                            name="coaching_assessment_frequency"
                            type="number"
                            placeHolder="Frequency"
                            disabled={loading}
                            variant="primary"
                            inputClassName="rounded-none"
                        />
                        <div className="mt-7">
                            <Button
                                label="Weeks"
                                className="rounded-none "
                                onClick={() => null}
                            />
                        </div>
                    </div>
                </Form>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mt-8">
                        <h1 className="text-2xl text-secondary">
                            Data to include in Assessment
                        </h1>
                        {!loading &&
                            assessmentDataList?.map((action, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <Checkbox
                                            name="checkbox"
                                            label={action?.label}
                                            onChange={() =>
                                                handleOnChangeStep(
                                                    action?.value
                                                )
                                            }
                                            checked={formik?.values?.coaching_assessment_data.includes(
                                                action?.value
                                            )}
                                            isNotFormHook
                                        />
                                    </Fragment>
                                );
                            })}
                        {loading && <RenderLoader />}
                    </div>
                </div>
                <hr className="mt-12" />
            </FormikProvider>
            <div className="flex md:justify-end py-4 w-full mt-4">
                <Button
                    variant="primary"
                    label="Save Changes"
                    className={"w-full lg:w-3/12 btn-md"}
                    onClick={formik?.submitForm}
                />
            </div>
        </div>
    );
};

export default CoachingAssessment;
