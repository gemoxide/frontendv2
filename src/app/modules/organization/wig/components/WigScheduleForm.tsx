import { Form, useFormik } from "formik";
import { FormikProvider } from "formik";
import React from "react";
import Input from "../../../../core/components/Forms/Input";
import Button from "../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../core/state/reducer/gym-revenue";
import { RootState } from "../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { CreateGymRevenueScheme } from "../../../../core/services/gym-revenue/gym-revenue.scheme";

type Props = {
    selectedMonth: any;
    onDismiss: () => void;
    onSubmit: () => void;
};

const WigScheduleForm: React.FC<Props> = ({
    selectedMonth,
    onDismiss,
    onSubmit,
}) => {
    const { createGymRevenue, updateGymRevenue } = mapDispatchToProps();
    const { loading: createGymRevenueLoading } = useSelector(
        (state: RootState) => state.gymRevenue.createGymRevenue
    );

    const { loading: updateGymRevenueLoading } = useSelector(
        (state: RootState) => state.gymRevenue.updateGymRevenue
    );
    const formik = useFormik({
        initialValues: {
            id: selectedMonth?.id || "",
            month_year: selectedMonth?.year_month || "",
            membership_revenue: selectedMonth?.membership_revenue || "",
            pt_revenue: selectedMonth?.pt_revenue || "",
            gym_id: selectedMonth?.gym_id || "",
            membership_count: selectedMonth?.membership_count || "",
            pt_count: selectedMonth?.pt_count || "",
        },
        validationSchema: CreateGymRevenueScheme,
        onSubmit: async (values) => {
            if (selectedMonth?.id) updateGymRevenue(values);
            else createGymRevenue(values);

            onSubmit();
        },
    });

    const loading = createGymRevenueLoading || updateGymRevenueLoading;

    return (
        <div className="max-w-md mx-auto py-4 px-4">
            <h1 className="text-2xl font-extrabold mb-4">
                <span>Info for {selectedMonth?.month_year}</span>
            </h1>

            <p className="text-sm text-secondary mb-8">
                You must enter your revenue for {selectedMonth?.month_year} for
                the most accurate calculations
            </p>

            <div className="flex flex-col md:flex-row gap-20">
                {/* First Column */}
                <div className="flex-1">
                    <FormikProvider value={formik}>
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="space-y-4 w-full mb-5"
                        >
                            <Input
                                label="Membership Revenue"
                                name="membership_revenue"
                                type="text"
                                placeHolder="Enter revenue"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                            <Input
                                label="Membership Count"
                                name="membership_count"
                                type="number"
                                placeHolder="Enter count"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                            <Input
                                label="PT Revenue"
                                name="pt_revenue"
                                type="text"
                                placeHolder="Enter revenue"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                            <Input
                                label="PT Count"
                                name="pt_count"
                                type="number"
                                placeHolder="Enter count"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                            <div className="flex gap-2 w-full text-center">
                                <Button
                                    label="Save and Proceed"
                                    className="w-1/2 capitalize"
                                    type="submit"
                                />
                                <Button
                                    label="Dismiss"
                                    className="w-1/2 capitalize"
                                    type="button"
                                    onClick={onDismiss}
                                />
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    );
};

export default WigScheduleForm;
