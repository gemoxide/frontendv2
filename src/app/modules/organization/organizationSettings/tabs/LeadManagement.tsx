import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/settings";
import { mapDispatchToProps as mapDispatchToPropsOrganizations } from "../../../../core/state/reducer/organizations";
import { RootState } from "../../../../core/state/reducer";
import { Fragment, useEffect, useMemo } from "react";
import Radio from "../../../../core/components/Forms/Radio";
import Checkbox from "../../../../core/components/Forms/CheckBox";
import CheckBoxLoader from "../../../../core/components/Forms/CheckBox/CheckBoxLoader";

const LeadManagement = () => {
    const { getSettings } = mapDispatchToProps();
    const { updateOrganizationLeadManagement } =
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
        loading: updateOrganizationLeadManagementLoading,
        success: updateOrganizationLeadManagementSuccess,
    } = useSelector(
        (state: RootState) =>
            state.organizations.updateOrganizationLeadManagement
    );

    const loading =
        getOrganizationLoading ||
        settingsLoading ||
        updateOrganizationLeadManagementLoading;

    const formik = useFormik({
        initialValues: {
            lead_management_steps:
                getOrganizationData?.attributes?.lead_management_steps || 1,
            lead_management_step1_actions:
                getOrganizationData?.attributes
                    ?.lead_management_step1_actions || [],
            lead_management_step2_actions:
                getOrganizationData?.attributes
                    ?.lead_management_step2_actions || [],
            lead_management_step3_actions:
                getOrganizationData?.attributes
                    ?.lead_management_step3_actions || [],
        },
        enableReinitialize:
            getOrganizationLoading ||
            settingsLoading ||
            updateOrganizationLeadManagementSuccess,
        onSubmit: async (values) => {
            if (values?.lead_management_steps > 1)
                updateOrganizationLeadManagement(values);
            else
                updateOrganizationLeadManagement({
                    lead_management_steps: values?.lead_management_steps,
                    lead_management_step1_actions:
                        values?.lead_management_step1_actions,
                    lead_management_step2_actions: [],
                    lead_management_step3_actions: [],
                });
        },
    });

    const actionsList = useMemo(() => {
        if (settingsData?.lead_management_actions)
            return Object.entries(settingsData.lead_management_actions).map(
                ([value, label]) => ({ value, label })
            );
        else return [];
    }, [settingsData?.lead_management_actions]);

    const handleOnChangeStep = (
        value: string,
        field:
            | "lead_management_step1_actions"
            | "lead_management_step2_actions"
            | "lead_management_step3_actions"
    ) => {
        const array = [...formik.values?.[field]] || [];
        if (value) {
            if (array.includes(value)) {
                const index = array.indexOf(value);
                if (index > -1) array.splice(index, 1);
            } else array.push(value);

            formik.setFieldValue(field, array);
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
                Lead Management
            </h1>
            <h2 className="mt-4 text-grey-tertiary">
                Select the number of onboarding steps and what actions are
                triggered for each step
            </h2>

            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-3/4 h-full mt-4">
                    <Radio
                        options={[
                            {
                                label: "One step",
                                value: 1,
                            },
                            {
                                label: "Three step",
                                value: 3,
                            },
                        ]}
                        name="Step"
                        size="small"
                        value={formik?.values?.lead_management_steps}
                        onChange={(e) =>
                            formik?.setFieldValue(
                                "lead_management_steps",
                                e?.target?.value
                            )
                        }
                    />
                </Form>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mt-8">
                        <h1 className="text-2xl  text-secondary">JS1/FC1</h1>
                        {!loading &&
                            actionsList?.map((action, idx) => {
                                return (
                                    <Fragment key={idx}>
                                        <Checkbox
                                            name="checkbox"
                                            label={action?.label}
                                            onChange={() =>
                                                handleOnChangeStep(
                                                    action?.value,
                                                    "lead_management_step1_actions"
                                                )
                                            }
                                            checked={formik?.values?.lead_management_step1_actions.includes(
                                                action?.value
                                            )}
                                            isNotFormHook
                                        />
                                    </Fragment>
                                );
                            })}
                        {loading && <RenderLoader />}
                    </div>
                    {formik?.values?.lead_management_steps > 1 && (
                        <>
                            <div className="mt-8">
                                <h1 className="text-2xl  text-secondary">
                                    JS1/FC2
                                </h1>
                                {!loading &&
                                    actionsList?.map((action, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <Checkbox
                                                    name="checkbox"
                                                    label={action?.label}
                                                    onChange={() =>
                                                        handleOnChangeStep(
                                                            action?.value,
                                                            "lead_management_step2_actions"
                                                        )
                                                    }
                                                    checked={formik?.values?.lead_management_step2_actions.includes(
                                                        action?.value
                                                    )}
                                                    isNotFormHook
                                                />
                                            </Fragment>
                                        );
                                    })}
                                {loading && <RenderLoader />}
                            </div>
                            <div className="mt-8">
                                <h1 className="text-2xl  text-secondary">
                                    JS1/FC3
                                </h1>
                                {!loading &&
                                    actionsList?.map((action, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <Checkbox
                                                    name="checkbox"
                                                    label={action?.label}
                                                    onChange={() =>
                                                        handleOnChangeStep(
                                                            action?.value,
                                                            "lead_management_step3_actions"
                                                        )
                                                    }
                                                    checked={formik?.values?.lead_management_step3_actions.includes(
                                                        action?.value
                                                    )}
                                                    isNotFormHook
                                                />
                                            </Fragment>
                                        );
                                    })}
                                {loading && <RenderLoader />}
                            </div>
                        </>
                    )}
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

export default LeadManagement;
