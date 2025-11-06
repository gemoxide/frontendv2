import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/sales-agreements";
import Checkbox from "../../../core/components/Forms/CheckBox";
import { ISalesAgreement } from "../../../core/interfaces/sales-agreements.interface";
import Select from "../../../core/components/Forms/Select";
import { CreateSalesAgreementSchema } from "../../../core/services/sales-agreements/sales-agreements.schema";

type Props = {
    selectedSalesAgreement?: ISalesAgreement;
    gymId?: number;
    organizationId?: number;
};

const CreateSalesAgreementForm: React.FC<Props> = ({
    selectedSalesAgreement,
    gymId,
    organizationId,
}) => {
    const { createSalesAgreement, updateSalesAgreement } = mapDispatchToProps();

    const { loading: createGymLoading } = useSelector(
        (state: RootState) => state.salesAgreements.createSalesAgreement
    );

    const { loading: updateGymLoading } = useSelector(
        (state: RootState) => state.salesAgreements.updateSalesAgreement
    );

    const formik = useFormik({
        initialValues: {
            gym_id: gymId || undefined,
            organization_id: organizationId || undefined,
            sales_agreement_id: selectedSalesAgreement?.id || undefined,
            name: selectedSalesAgreement?.attributes?.name || "",
            price: selectedSalesAgreement?.attributes?.price || 0,
            duration: selectedSalesAgreement?.attributes?.duration || "",
            duration_frequency:
                selectedSalesAgreement?.attributes?.duration_frequency || "",
            is_auto_renewal:
                selectedSalesAgreement?.attributes?.is_auto_renewal || false,
            is_active: selectedSalesAgreement?.attributes.is_active || false,
            type: selectedSalesAgreement?.attributes.type || "Membership",
            weekly_training_frequency:
                selectedSalesAgreement?.attributes.weekly_training_frequency ||
                undefined,
            billing_type: selectedSalesAgreement?.attributes?.billing_type,
        },
        validationSchema: CreateSalesAgreementSchema,
        onSubmit: async (values) => {
            if (selectedSalesAgreement?.id) {
                updateSalesAgreement(values);
            } else {
                createSalesAgreement(values);
            }
        },
    });

    const loading = createGymLoading || updateGymLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">Sales Agreement</h1>
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeHolder="Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        label="Type"
                        name="type"
                        placeHolder="Select Type "
                        autoComplete
                        disabled={loading}
                        variant="default"
                        options={[
                            {
                                value: "Membership",
                                label: "Membership",
                            },
                            {
                                value: "Trial Membership",
                                label: "Trial Membership",
                            },
                            {
                                value: "Coached Client",
                                label: "Coached Client",
                            },
                            {
                                value: "Trial Coached Client",
                                label: "Trial Coached Client",
                            },
                        ]}
                    />
                    <div className="flex">
                        <div className="w-1/2 mr-2">
                            <Input
                                label="Duration"
                                name="duration"
                                type="number"
                                placeHolder="Duration"
                                autoComplete
                                disabled={loading}
                                variant="default"
                                min="1"
                                step="1"
                            />
                        </div>
                        <div className="w-1/2">
                            <Select
                                label="Duration Frequency"
                                name="duration_frequency"
                                placeHolder="Duration "
                                autoComplete
                                disabled={loading}
                                variant="default"
                                options={[
                                    // {
                                    //     value: "days",
                                    //     label: "Days",
                                    // },
                                    {
                                        value: "weeks",
                                        label: "Weeks",
                                    },
                                    {
                                        value: "months",
                                        label: "Months",
                                    },
                                    {
                                        value: "years",
                                        label: "Years",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        placeHolder="Price"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        min="0"
                    />

                    <Input
                        label="Weekly Training Frequency"
                        name="weekly_training_frequency"
                        type="number"
                        placeHolder="Weekly Training Frequency"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        min="1"
                        step="1"
                        onKeyDown={(evt) =>
                            (evt.key === "e" || evt.key === ".") &&
                            evt.preventDefault()
                        }
                    />
                    {/* billing type */}
                    <Select
                        label="Billing Type"
                        name="billing_type"
                        placeHolder="Select Billing Type "
                        autoComplete
                        disabled={loading}
                        variant="default"
                        options={[
                            {
                                value: "Weekly",
                                label: "Weekly",
                            },
                            {
                                value: "Bi-Weekly",
                                label: "Bi-Weekly",
                            },
                            {
                                value: "Monthly",
                                label: "Monthly",
                            },
                            {
                                value: "Paid in Full",
                                label: "Paid in Full",
                            },
                        ]}
                    />
                    <div className="ml-4">
                        <Checkbox
                            label="Is Available for Auto Renewal"
                            name="is_auto_renewal"
                            variant="default"
                            checked={formik.values.is_auto_renewal}
                        />
                    </div>
                    <div className="ml-4">
                        <Checkbox
                            label="Is Active"
                            name="is_active"
                            variant="default"
                            checked={formik.values.is_active}
                        />
                    </div>

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

export default CreateSalesAgreementForm;
