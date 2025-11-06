import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/gym-revenue";
import { IGymRevenue } from "../../../../../core/interfaces/gym-revenue.interface";
import Select from "../../../../../core/components/Forms/Select";
import { CreateGymRevenueScheme } from "../../../../../core/services/gym-revenue/gym-revenue.scheme";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

type Props = {
    selectedGymRevenue?: IGymRevenue;
    gym: string;
};

const CreateGymRevenueForm: React.FC<Props> = ({ selectedGymRevenue, gym }) => {
    const { createGymRevenue, updateGymRevenue } = mapDispatchToProps();
    const { id } = useParams();

    const { loading: createGymRevenueLoading } = useSelector(
        (state: RootState) => state.gymRevenue.createGymRevenue
    );

    const { loading: updateGymRevenueLoading } = useSelector(
        (state: RootState) => state.gymRevenue.updateGymRevenue
    );

    const currentMonth = useMemo(() => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}`;
    }, []);

    const formik = useFormik({
        initialValues: {
            id: selectedGymRevenue?.id || "",
            month_year:
                selectedGymRevenue?.attributes?.formatted_month_year ||
                currentMonth,
            membership_revenue:
                selectedGymRevenue?.attributes?.membership_revenue || "",
            pt_revenue: selectedGymRevenue?.attributes?.pt_revenue || "",
            gym_id: selectedGymRevenue?.relationships?.gym?.id || gym,
            membership_count:
                selectedGymRevenue?.attributes?.membership_count || "",
            pt_count: selectedGymRevenue?.attributes?.pt_count || "",
        },
        validationSchema: CreateGymRevenueScheme,
        onSubmit: async (values) => {
            if (selectedGymRevenue?.id) updateGymRevenue(values);
            else createGymRevenue(values);
        },
    });

    const loading = createGymRevenueLoading || updateGymRevenueLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl mb-10">Record Revenue</h1>
                    <Input
                        type="month"
                        isNotFormHook
                        name="month_year"
                        label="Month"
                        value={formik.values.month_year}
                        onChange={(e) =>
                            formik.setFieldValue("month_year", e.target.value)
                        }
                    />
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

export default CreateGymRevenueForm;
