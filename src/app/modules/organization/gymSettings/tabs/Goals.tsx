import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import EditableTextItem from "../../../../core/components/EditableTextItem";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchPropsReports } from "../../../../core/state/reducer/reports";
import { RootState } from "../../../../core/state/reducer";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CreateGoalsScheme } from "../../../../core/services/gyms/gyms.scheme";
import { PermissionType } from "../../../../core/interfaces/routes.interface";
import { numbersOnly } from "../../../../core/helpers/numbersOnly";
import { preventNegative } from "../../../../core/helpers/preventNegative";
import Wig from "../../../../core/components/Wig";
import CustomDataTable from "../../../../core/components/DataTable";
import {
    SALES_FORECAST_SANDBOX,
    REVENUE_GAP,
} from "../../../../core/constants/reports";
import {
    IConversionBenchMark,
    ISalesForecast,
} from "../../../../core/interfaces/reports.interface";

import { toast } from "react-toastify";
import { Transition } from "@headlessui/react";

const General = () => {
    const { id } = useParams();

    const [sandboxSalesForecast, setSandboxSalesForecast] =
        useState<ISalesForecast[]>();
    const [sandboxWigData, setSandboxWigData] = useState<any>({});
    const [conversionBenchmark, setConversionBenchmark] = useState<any>([]);
    const [mappedsandboxWigData, setMappedsandboxWigData] = useState<any>({});

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const {
        data: getGymData,
        loading: getGymLoading,
        success: getGymSuccess,
    } = useSelector((state: RootState) => state.gyms.getGym);

    const {
        data: getSandboxSalesForecastData,
        success: getSandboxSalesForecastSuccess,
        loading: getSandboxSalesForecastLoading,
        error: getSandboxSalesTrackerError,
    } = useSelector(
        (state: RootState) => state.reports.getSandboxSalesForecast
    );

    const {
        data: getSandboxWigData,
        success: getSandboxWigSuccess,
        loading: getSandboxWigLoading,
        error: getSandboxWigError,
    } = useSelector((state: RootState) => state.reports.getSandboxWig);

    const {
        data: conversionBenchmarkData,
        success: conversionBenchmarkSuccess,
        loading: conversionBenchmarkLoading,
        error: conversionBenchmarkError,
    } = useSelector((state: RootState) => state.reports.getConversionBenchmark);

    const {
        data: revenueGapData,
        success: revenueGapSuccess,
        loading: revenueGapLoading,
        error: revenueGapError,
    } = useSelector((state: RootState) => state.reports.getRevenueGap);

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

    const handleResetForm = () => {
        resetForm();
        if (!isResetting) {
            const isFormikValuesEqualToInitialValues = Object.keys(
                formik.values
            ).every(
                (key) =>
                    (formik.values as any)[key] ===
                    (formik.initialValues as any)[key]
            );

            if (!isFormikValuesEqualToInitialValues) {
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        }
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
                getGymData?.attributes?.wig_goal_date_formatted || "",
            new_members_per_month:
                getGymData?.attributes?.new_members_per_month,
            monthly_jsi_booked: getGymData?.attributes?.monthly_jsi_booked,
            monthly_pt_agreement_value:
                getGymData?.attributes?.monthly_pt_agreement_value,
            last_month_pt_revenue:
                getGymData?.attributes?.last_month_pt_revenue,
            last_month_membership_revenue:
                getGymData?.attributes?.last_month_membership_revenue,
            // leads_to_gym_tours_percent:
            //     getGymData?.attributes?.leads_to_gym_tours_percent,
            // membership_close_rate_percent:
            //     getGymData?.attributes?.membership_close_rate_percent,
            // js1_fc_booked_percent:
            //     getGymData?.attributes?.js1_fc_booked_percent,
            // js3_fc_close_rate_percent:
            //     getGymData?.attributes?.js3_fc_close_rate_percent,
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
            // prospect_to_lead_rate:
            //     getGymData?.attributes?.prospect_to_lead_rate,
            js1_show_rate_percent:
                getGymData?.attributes?.js1_show_rate_percent,
            js3_show_rate_percent:
                getGymData?.attributes?.js3_show_rate_percent,
            scheduled_js3: getGymData?.attributes?.scheduled_js3,
            new_prospects_per_month:
                getGymData?.attributes?.new_prospects_per_month,
        },
        enableReinitialize: true,
        validationSchema: CreateGoalsScheme,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            const { wig_goal_date, ...otherValues } = values;
            const { id, goal } = values;
            const body = {
                id: id,
                goal: goal,
            };

            await Promise.all([
                updateGym(otherValues),
                getGym(
                    currentUser?.relationships.user_gyms?.length
                        ? currentUser?.relationships.user_gyms[0].id
                        : parseInt(id || "")
                ),
                getSandboxWig({ ...body }),
                getSandboxSalesForecast({ ...otherValues }),
            ]);

            setIsSubmitting(false);
            toast.success("Gym updated successfully");
        },
        onReset: handleResetForm,
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

    const resetForm = useCallback(() => {
        if (isSubmitting) return;
        setIsResetting(true);
        fetchSandboxWigData();
        fetchSandboxSalesForecastData();
        setIsResetting(false);
    }, []);

    const fetchSandboxWigData = () => {
        getSandboxWig({
            id: getGymData?.id,
            goal: getGymData?.attributes?.goal,
        });
    };
    const fetchSandboxSalesForecastData = () => {
        const { wig_goal_date, ...others } = formik.initialValues;
        getSandboxSalesForecast({
            ...others,
        });
    };
    const getchConversionBenchmarkData = () => {
        const { id } = formik.initialValues;
        getConversionBenchmark(id);
    };

    const fetchRevenueGapData = () => {
        getRevenueGap({
            gym: getGymData?.id,
        });
    };

    useEffect(() => {
        getGym(
            currentUser?.relationships.user_gyms?.length
                ? currentUser?.relationships.user_gyms[0].id
                : parseInt(id || "")
        );
    }, []);

    useEffect(() => {
        if (!getSandboxWigLoading && getSandboxWigSuccess) {
            setSandboxWigData(getSandboxWigData?.data || []);
        }
    }, [getSandboxWigSuccess, getSandboxWigLoading]);

    useEffect(() => {
        if (!conversionBenchmarkLoading && conversionBenchmarkSuccess) {
            setConversionBenchmark(conversionBenchmarkData?.data || []);
        }
    }, [conversionBenchmarkSuccess, conversionBenchmarkLoading]);

    useEffect(() => {
        if (!getSandboxSalesForecastLoading && getSandboxSalesForecastSuccess) {
            let sortedData;

            if (
                getSandboxSalesForecastData &&
                getSandboxSalesForecastData.data
            ) {
                if (
                    getGymData?.relationships?.organization?.attributes
                        ?.lead_management_steps === 1
                ) {
                    const data = getSandboxSalesForecastData.data.filter(
                        (item) => item.order !== 8
                    );
                    sortedData = data.slice().sort((a, b) => a.order - b.order);
                } else {
                    sortedData = getSandboxSalesForecastData.data
                        .slice()
                        .sort((a, b) => a.order - b.order);
                }

                setSandboxSalesForecast(sortedData || []);
            }
        }
    }, [
        getSandboxSalesForecastSuccess,
        getSandboxSalesForecastLoading,
        getSandboxSalesForecastData,
        getGymData,
    ]);

    useEffect(() => {
        if (getGymData?.id) {
            fetchSandboxWigData();
            fetchRevenueGapData();
        }
    }, [getGymData?.id]);

    useEffect(() => {
        if (formik.values.id) {
            fetchSandboxSalesForecastData();
            getchConversionBenchmarkData();
        }
    }, [formik.values.id]);

    useEffect(() => {
        processWigData();
    }, [sandboxWigData]);

    const processWigData = () => {
        const processedData = {
            data: [
                {
                    name: "Total Membership Revenue",
                    value: getSandboxWigData?.data?.total_membership_revenue,
                },
                {
                    name: "Total PT Revenue",
                    value: getSandboxWigData?.data?.total_pt_revenue,
                },
                {
                    name: "Remaining",
                    value: getSandboxWigData?.data?.remaining,
                },
            ],
            goal: getSandboxWigData?.data?.goal,
            total: getSandboxWigData?.data?.total_revenue,
            percentage_to_goal: getSandboxWigData?.data?.percentage_to_goal,
            end_date_formatted: getSandboxWigData?.data?.end_date_formatted,
        };
        setMappedsandboxWigData(processedData);
    };

    useEffect(() => {
        const today = new Date();
    }, []);

    const handleChange = () => {
        const { id, goal } = formik.values;
        const { wig_goal_date, ...others } = formik.values;
        const body = {
            id: id,
            goal: goal,
        };
        getSandboxWig({ ...body });
        getSandboxSalesForecast({ ...others });
    };

    const loading =
        getGymLoading ||
        updateGymLoading ||
        getSandboxSalesForecastLoading ||
        getSandboxWigLoading ||
        revenueGapLoading;

    const handleChanges = () => {
        if (formik.touched) {
            const isFormikValuesEqualToInitialValues = Object.keys(
                formik.values
            ).every((key) => {
                return (
                    (formik.values as any)[key] ===
                    (formik.initialValues as any)[key]
                );
            });

            if (!isFormikValuesEqualToInitialValues) {
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        }
    };

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <Transition
                show={isEditing}
                enter="transition-transform duration-300 transform origin-bottom"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition-transform duration-300 transform origin-bottom"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="alert bg-primary border-primary mb-14">
                    <span className="text-secondary">
                        Your changes are currently in preview mode. Please click{" "}
                        <strong>Save Changes</strong> to apply them permanently.
                    </span>
                </div>
            </Transition>

            <FormikProvider value={formik}>
                <Form>
                    <div className="flex flex-row">
                        <div className="w-5/12">
                            <h1 className="text-3xl font-extrabold text-secondary">
                                Goals
                            </h1>

                            <div className="space-y-8 w-full lg:w-3/4 mt-12">
                                <div className="flex flex-row justify-between">
                                    <h2 className="text-2xl font-extrabold text-secondary">
                                        Goals
                                    </h2>
                                    {isEditing && (
                                        <div>
                                            <Button
                                                isSubmitting={loading}
                                                variant="secondary"
                                                label="Recalculate"
                                                className={
                                                    "w-full btn-sm text-xs"
                                                }
                                                onClick={handleChange}
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* 1 */}
                                <Input
                                    label="Your Organization WIG goal due"
                                    name="wig_goal_date"
                                    type="month"
                                    placeHolder="Select Date"
                                    autoComplete
                                    disabled={true}
                                    readonly={true}
                                />
                                {/* 2 */}
                                <Input
                                    label="Wildly important goal"
                                    inputClassName="pl-5"
                                    name="goal"
                                    type="number"
                                    placeHolder="Input Your $ Goal Here"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />

                                {/* 3 */}
                                <Input
                                    label="Last Months Membership Revenue"
                                    prefix="$"
                                    inputClassName="pl-5"
                                    name="last_month_membership_revenue"
                                    type="text"
                                    placeHolder="Last Months Membership Revenue"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onInput={numbersOnly}
                                    onKeyDown={preventNegative}
                                    onBlur={handleChanges}
                                />
                                {/* 4 */}
                                <Input
                                    label="Monthly Membership Revenue"
                                    prefix="$"
                                    inputClassName="pl-5"
                                    name="monthly_membership_revenue"
                                    type="text"
                                    placeHolder="Monthly Membershiop Revenue"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onInput={numbersOnly}
                                    onKeyDown={preventNegative}
                                    onBlur={handleChanges}
                                />
                                {/* 5 */}
                                <Input
                                    label="Last Months PT Revenue"
                                    prefix="$"
                                    inputClassName="pl-5"
                                    name="last_month_pt_revenue"
                                    type="text"
                                    placeHolder="Last Months PT Revenue"
                                    autoComplete
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onInput={numbersOnly}
                                    onKeyDown={preventNegative}
                                    onBlur={handleChanges}
                                />
                                {/* 6 */}
                                <Input
                                    label="Monthly PT revenue"
                                    prefix="$"
                                    inputClassName="pl-5"
                                    name="monthly_pt_agreement_value"
                                    type="text"
                                    placeHolder="Total Agreement $ Value"
                                    autoComplete
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onInput={numbersOnly}
                                    onKeyDown={preventNegative}
                                    onBlur={handleChanges}
                                />
                                {/* 9 */}
                                <Input
                                    label="New PT Clients"
                                    name="new_pt_per_month"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 10 */}
                                <Input
                                    label="JS3s & PT Follow Ups"
                                    name="coached_client_appointments"
                                    type="number"
                                    placeHolder="Enter goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="PT Appointments"
                                    name="coached_client_closed"
                                    type="number"
                                    placeHolder="Enter goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 11 */}
                                <Input
                                    label="JS3 Tour Show Per Month"
                                    name="js3_tour_show_per_month"
                                    type="number"
                                    placeHolder="Enter goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 12 */}
                                <Input
                                    label="JS1 Tour Show Per Month"
                                    name="js1_tour_show_per_month"
                                    type="number"
                                    placeHolder="Enter goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 13 */}
                                <Input
                                    label="New Members per month"
                                    name="new_members_per_month"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 14 */}
                                <Input
                                    label="Monthly JS1's booked at POS & After"
                                    name="monthly_jsi_booked"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 15 */}
                                <Input
                                    label="Cancelled Members per month"
                                    name="cancelled_members_per_month"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 16 */}
                                <Input
                                    label="Gym Tour Show Per Month"
                                    name="gym_tour_show_per_month"
                                    type="number"
                                    placeHolder="Enter goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                {/* 17 */}
                                <Input
                                    label="New Leads per month"
                                    name="new_leads_per_month"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="New Prospects per month"
                                    name="new_prospects_per_month"
                                    type="number"
                                    placeHolder="Enter Goal"
                                    autoComplete
                                    min="0"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                            </div>
                            <div className="space-y-8 w-full lg:w-3/4 mt-12">
                                <h2 className="text-2xl font-extrabold text-secondary">
                                    Conversion Rates
                                </h2>
                                {/* <Input
                                    label="% Prospect to Lead Rate"
                                    name="prospect_to_lead_rate"
                                    type="number"
                                    placeHolder="Goal % set by management"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="% Leads to Gym Tour Bookings"
                                    name="leads_to_gym_tours_percent"
                                    type="number"
                                    placeHolder="Goal % set by management"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="% Gym Tours to Membership Agreement"
                                    name="membership_close_rate_percent"
                                    type="number"
                                    placeHolder="Gyms target %"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="% JS1(FC) Bookings"
                                    name="js1_fc_booked_percent"
                                    type="number"
                                    placeHolder="Gyms target %"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="% JS3(FC) Date scheduled"
                                    name="js3_fc_close_rate_percent"
                                    type="number"
                                    placeHolder="Gyms target %"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                /> */}
                                <Input
                                    label="Membership Attrition Rate %"
                                    name="membership_attrition_rate_percent"
                                    type="number"
                                    placeHolder="Gyms target %"
                                    autoComplete
                                    min="0"
                                    max="100"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                                <Input
                                    label="PT Retention Rate %"
                                    name="pt_retention_rate_percent"
                                    type="number"
                                    placeHolder="Gyms target %"
                                    autoComplete
                                    min="1"
                                    disabled={loading}
                                    readonly={!hasUpdateGym}
                                    onBlur={handleChanges}
                                />
                            </div>
                        </div>
                        <div className="w-7/12">
                            <Transition
                                show={isEditing}
                                enter="transition-transform duration-300 transform origin-left"
                                enterFrom="opacity-0 translate-x-[-100%]"
                                enterTo="opacity-100 translate-x-0"
                                leave="transition-transform duration-300 transform origin-left"
                                leaveFrom="opacity-100 translate-x-0"
                                leaveTo="opacity-0 translate-x-[-100%]"
                            >
                                <div className="flex flex-row space-x-4 justify-between">
                                    <div className="flex pb-4 w-full">
                                        {hasUpdateGym && (
                                            <Button
                                                isSubmitting={loading}
                                                variant="default"
                                                label="Reset Changes"
                                                className={"w-full btn-md"}
                                                onClick={formik.resetForm}
                                            />
                                        )}
                                    </div>
                                    <div className="flex pb-4 w-full">
                                        {hasUpdateGym && (
                                            <Button
                                                isSubmitting={loading}
                                                variant="primary"
                                                label="Save Changes"
                                                className={"w-full btn-md"}
                                                onClick={formik?.submitForm}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Transition>
                            <div className="card w-full bg-base-100 shadow-xl mb-10">
                                <div className="card-body !p-4">
                                    <Wig
                                        data={mappedsandboxWigData}
                                        isCenter={true}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <h3 className="text-secondary text-center cursor-pointer font-bold mb-2">
                                    Conversion Rate Benchmarks
                                </h3>
                                {conversionBenchmark && (
                                    <table className="table text-xs">
                                        <thead>
                                            <tr className="bg-[#F4F9FF] text-black">
                                                <th>
                                                    Conversion Rate Benchmarks
                                                </th>
                                                <th>Actual</th>
                                                <th className="text-right">
                                                    Benchmark
                                                </th>
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
                                                            getGymData
                                                                ?.relationships
                                                                ?.organization
                                                                ?.attributes
                                                                ?.lead_management_steps !==
                                                                3
                                                        ) {
                                                            return null;
                                                        }
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {item?.name}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item?.actual
                                                                    }
                                                                </td>
                                                                <td className="text-right">
                                                                    <Input
                                                                        label=""
                                                                        name={
                                                                            item?.field
                                                                        }
                                                                        size="custom"
                                                                        type="number"
                                                                        placeHolder="Enter Goal"
                                                                        autoComplete
                                                                        min="0"
                                                                        max="100"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        readonly={
                                                                            !hasUpdateGym
                                                                        }
                                                                        onBlur={
                                                                            handleChanges
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
                            </div>
                            <div className="flex flex-row justify-around my-5">
                                <Transition
                                    show={isEditing}
                                    enter="transition-transform duration-300 transform origin-left"
                                    enterFrom="opacity-0 translate-x-[-100%]"
                                    enterTo="opacity-100 translate-x-0"
                                    leave="transition-transform duration-300 transform origin-left"
                                    leaveFrom="opacity-100 translate-x-0"
                                    leaveTo="opacity-0 translate-x-[-100%]"
                                >
                                    <div className="flex flex-row space-x-4 justify-between w-full">
                                        <div className="flex pb-4 flex-grow">
                                            {hasUpdateGym && (
                                                <Button
                                                    isSubmitting={loading}
                                                    variant="default"
                                                    label="Reset Changes"
                                                    className={"w-full btn-md"}
                                                    onClick={formik.resetForm}
                                                />
                                            )}
                                        </div>
                                        <div className="flex pb-4 flex-grow">
                                            {hasUpdateGym && (
                                                <Button
                                                    isSubmitting={loading}
                                                    variant="primary"
                                                    label="Save Changes"
                                                    className={"w-full btn-md"}
                                                    onClick={formik?.submitForm}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                            <div>
                                <h3 className="text-secondary text-center cursor-pointer font-bold mb-2">
                                    {REVENUE_GAP.label}
                                </h3>
                                <CustomDataTable
                                    columns={REVENUE_GAP.columns || []}
                                    data={revenueGapData?.data || []}
                                />
                            </div>
                            <div>
                                <h3 className="text-secondary text-center cursor-pointer font-bold mb-2">
                                    Sales Tracker Forecast
                                </h3>
                                <CustomDataTable
                                    columns={
                                        SALES_FORECAST_SANDBOX.columns || []
                                    }
                                    data={sandboxSalesForecast || []}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default General;
