import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchPropsReports } from "../../../../core/state/reducer/reports";
import { RootState } from "../../../../core/state/reducer";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CreateBenchMarkScheme } from "../../../../core/services/gyms/gyms.scheme";
import { PermissionType } from "../../../../core/interfaces/routes.interface";
import { numbersOnly } from "../../../../core/helpers/numbersOnly";
import { preventNegative } from "../../../../core/helpers/preventNegative";
import { useState } from "react";
import { IConversionBenchMark } from "../../../../core/interfaces/reports.interface";
import { toast } from "react-toastify";

const Benchmarks = () => {
    const [conversionBenchmark, setConversionBenchmark] = useState<any>([]);
    const { id } = useParams();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymData, loading: getGymLoading } = useSelector(
        (state: RootState) => state.gyms.getGym
    );

    const { loading: updateGymLoading } = useSelector(
        (state: RootState) => state.gyms.updateGym
    );

    const { getGym, updateGym } = mapDispatchToProps();
    const {
        getSandboxSalesForecast,
        getSandboxWig,
        getConversionBenchmark,
        getRevenueGap,
    } = mapDispatchPropsReports();
    const {
        data: conversionBenchmarkData,
        success: conversionBenchmarkSuccess,
        loading: conversionBenchmarkLoading,
        error: conversionBenchmarkError,
    } = useSelector((state: RootState) => state.reports.getConversionBenchmark);

    useEffect(() => {
        getGym(
            currentUser?.relationships.user_gyms?.length
                ? currentUser?.relationships.user_gyms[0].id
                : parseInt(id || "")
        );
    }, []);

    const currentMonth = useMemo(() => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}`;
    }, []);

    const getchConversionBenchmarkData = () => {
        const { id } = formik.initialValues;
        getConversionBenchmark(id);
    };

    const formik = useFormik({
        initialValues: {
            id: getGymData?.id,
            name: getGymData?.attributes?.name || "",
            address: getGymData?.attributes?.address || "",
            team_member_review_cadence:
                getGymData?.attributes?.team_member_review_cadence,
            goal: getGymData?.attributes?.goal,
            wig_goal_date:
                getGymData?.relationships?.organization?.attributes
                    ?.wig_goal_date_formatted || "",
            new_members_per_month:
                getGymData?.attributes?.new_members_per_month,
            monthly_jsi_booked: getGymData?.attributes?.monthly_jsi_booked,
            monthly_pt_agreement_value:
                getGymData?.attributes?.monthly_pt_agreement_value,
            last_month_pt_revenue:
                getGymData?.attributes?.last_month_pt_revenue,
            last_month_membership_revenue:
                getGymData?.attributes?.last_month_membership_revenue,
            leads_to_gym_tours_percent:
                getGymData?.attributes?.leads_to_gym_tours_percent,
            membership_close_rate_percent:
                getGymData?.attributes?.membership_close_rate_percent,
            js1_fc_booked_percent:
                getGymData?.attributes?.js1_fc_booked_percent,
            js3_fc_close_rate_percent:
                getGymData?.attributes?.js3_fc_close_rate_percent,
            membership_attrition_rate_percent:
                getGymData?.attributes?.membership_attrition_rate_percent,
            pt_retention_rate_percent:
                getGymData?.attributes?.pt_retention_rate_percent,
            new_leads_per_month: getGymData?.attributes?.new_leads_per_month,
            cancelled_members_per_month:
                getGymData?.attributes?.cancelled_members_per_month,
            new_pt_per_month: getGymData?.attributes?.new_pt_per_month,
            monthly_membership_revenue:
                getGymData?.attributes?.monthly_membership_revenue,
            gym_tour_show_per_month:
                getGymData?.attributes?.gym_tour_show_per_month,
            js1_tour_show_per_month:
                getGymData?.attributes?.js1_tour_show_per_month,
            js3_tour_show_per_month:
                getGymData?.attributes?.js3_tour_show_per_month,
            coached_client_closed:
                getGymData?.attributes?.coached_client_closed,
            coached_client_appointments:
                getGymData?.attributes?.coached_client_appointments,
            prospect_to_lead_rate:
                getGymData?.attributes?.prospect_to_lead_rate,
            js1_show_rate_percent:
                getGymData?.attributes?.js1_show_rate_percent,
            js3_show_rate_percent:
                getGymData?.attributes?.js3_show_rate_percent,
            scheduled_js3: getGymData?.attributes?.scheduled_js3,
        },
        enableReinitialize: true,
        validationSchema: CreateBenchMarkScheme,
        onSubmit: async (values) => {
            const { wig_goal_date, ...otherValues } = values;
            updateGym(otherValues);
            toast.success("Gym updated successfully");
        },
    });

    useEffect(() => {
        if (!conversionBenchmarkLoading && conversionBenchmarkSuccess) {
            setConversionBenchmark(conversionBenchmarkData?.data || []);
        }
    }, [conversionBenchmarkSuccess, conversionBenchmarkLoading]);

    useEffect(() => {
        if (formik.values.id) {
            getchConversionBenchmarkData();
        }
    }, [formik.values.id]);

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
                Conversion Benchmarks
            </h1>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-3/4 h-full mt-12">
                    {conversionBenchmark && (
                        <table className="table text-xs">
                            <thead>
                                <tr className="bg-[#F4F9FF] text-black">
                                    <th>Conversion Rate Benchmarks</th>
                                    <th>Actual</th>
                                    <th className="text-right">Benchmark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conversionBenchmark &&
                                    conversionBenchmark?.map(
                                        (
                                            item: IConversionBenchMark,
                                            index: number
                                        ) => {
                                            if (
                                                item?.field ===
                                                    "scheduled_js3" &&
                                                getGymData?.relationships
                                                    ?.organization?.attributes
                                                    ?.lead_management_steps !==
                                                    3
                                            ) {
                                                return null;
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.actual}</td>
                                                    <td className="text-right">
                                                        <Input
                                                            label=""
                                                            name={item?.field}
                                                            size="custom"
                                                            type="number"
                                                            placeHolder="Enter Goal"
                                                            autoComplete
                                                            min="0"
                                                            max="100"
                                                            disabled={loading}
                                                            readonly={
                                                                !hasUpdateGym
                                                            }
                                                            onInput={
                                                                numbersOnly
                                                            }
                                                            onKeyDown={
                                                                preventNegative
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    )}
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

export default Benchmarks;
