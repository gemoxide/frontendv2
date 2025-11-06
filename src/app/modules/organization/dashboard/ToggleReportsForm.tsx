import { Form, FormikProvider, useFormik } from "formik";
import { DASHBOARD_REPORTS } from "../../../core/constants/dashboard-reports";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/auth";
import Checkbox from "../../../core/components/Forms/CheckBox";
import Button from "../../../core/components/Button";

const ToggleReportsForm: React.FC = () => {
    const { updateDashboardReports } = mapDispatchToProps();
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { loading: loading } = useSelector(
        (state: RootState) => state.auth.updateDashboardReports
    );

    const formik = useFormik({
        initialValues: {
            dashboard_reports: currentUser?.attributes.dashboard_reports || [],
        },
        onSubmit: async (values) => {
            updateDashboardReports(values);
        },
    });

    return (
        <div className="p-5">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl border-b border-solid pb-3">
                        Add Tiles to Dashboard
                    </h1>
                    {DASHBOARD_REPORTS.map((report, i) => {
                        return (
                            <Checkbox
                                containerClassName="flex items-center my-4 gap-x-4 justify-between border-b border-solid pb-3"
                                name="dashboard_reports"
                                value={report}
                                label={report}
                                labelPosition="left"
                                size="medium"
								defaultChecked={currentUser?.attributes.dashboard_reports.includes(report)}
                                key={i}
                            />
                        );
                    })}
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Done"
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

export default ToggleReportsForm;
