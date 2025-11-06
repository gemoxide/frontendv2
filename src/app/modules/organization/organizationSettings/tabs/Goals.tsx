import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import CustomDataTable from "../../../../core/components/DataTable";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/organizations";
import { mapDispatchToProps as mapDispatchToGymsProps } from "../../../../core/state/reducer/gyms";
import { RootState } from "../../../../core/state/reducer";
import { CreateOrganizationScheme } from "../../../../core/services/organizations/organizations.schema";
import { useEffect, useMemo, useState } from "react";
import { PermissionType } from "../../../../core/interfaces/routes.interface";
import { TableColumn } from "react-data-table-component";
import { IGym } from "../../../../core/interfaces/gyms.interface";
import { EyeIcon } from "@heroicons/react/24/outline";
import { convertToCurrencyWithDecimal } from "../../../../core/services/utils/utils.service";
import { ROUTES } from "../../../../core/constants/routes";

const Goals = () => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { getGyms } = mapDispatchToGymsProps();
    const { data: getOrganizationData, loading: getOrganizationLoading } =
        useSelector((state: RootState) => state.organizations.getOrganization);

    const { loading: updateOrganizationLoading } = useSelector(
        (state: RootState) => state.organizations.updateOrganization
    );

    const { data: getGymsData, loading: getGymsLoading } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { getOrganization, updateOrganization } = mapDispatchToProps();

    const fetch = async () => {
        getGyms({
            page,
            per_page: perPage,
        });
        getOrganization();
    };

    useEffect(() => {
        fetch();
    }, []);

    const formik = useFormik({
        initialValues: {
            id: getOrganizationData?.id,
            name: getOrganizationData?.attributes?.name || "",
            tagline: getOrganizationData?.attributes?.tagline || "",
            logo: getOrganizationData?.attributes?.logo || "",
            goal: getOrganizationData?.attributes?.goal,
            wig_goal_date:
                getOrganizationData?.attributes?.wig_goal_date_formatted || "",
        },
        enableReinitialize: true,
        validationSchema: CreateOrganizationScheme,
        onSubmit: async (values) => {
            updateOrganization({
                name: values?.name,
                tagline: values?.tagline,
                goal: values?.goal,
                wig_goal_date: values?.wig_goal_date,
            });
        },
    });

    const hasViewGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const lastCustomRow = {
        id: "custom-row",
        attributes: {
            name: "Total",
            goal: getGymsData?.data
                ?.map((gym) => gym?.attributes?.goal)
                .reduce((a, b) => (a ?? 0) + (b ?? 0), 0),
        },
    };

    const customRows = useMemo(() => {
        return getGymsData?.data ? [...getGymsData?.data, lastCustomRow] : [];
    }, [getGymsData]);

    const columns: TableColumn<IGym>[] = [
        {
            name: "Location",
            cell: (gym) => (
                <span
                    className={
                        gym.id === lastCustomRow.id ? "font-bold text-base" : ""
                    }
                >
                    {gym?.attributes?.name}
                </span>
            ),
            width: "45%",
        },
        {
            name: "Goal",
            cell: (gym) => (
                <span
                    className={
                        gym.id === lastCustomRow.id ? "font-bold text-base" : ""
                    }
                >
                    {convertToCurrencyWithDecimal(gym?.attributes?.goal ?? 0)}
                </span>
            ),
            width: "25%",
            right: true,
        },
        {
            name: "",
            width: "30%",
            sortable: false,
            cell: (gym: any) => (
                <>
                    {hasViewGym && gym.id !== lastCustomRow.id && (
                        <span
                            role="button"
                            onClick={() => {
                                const url =
                                    ROUTES.USER.organizationGymSettings.parse(
                                        gym.id
                                    );
                                window.open(url, "_blank");
                            }}
                        >
                            <EyeIcon className="h-5 w-5 text-secondary" />
                        </span>
                    )}
                </>
            ),
            right: true,
        },
    ];

    const loading =
        getOrganizationLoading || updateOrganizationLoading || getGymsLoading;

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">Goals</h1>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-3/4 h-full mt-12">
                    <Input
                        label="Wildly important goal"
                        inputClassName="pl-5"
                        name="goal"
                        type="number"
                        placeHolder="Input Your $ Goal Here"
                        autoComplete
                        min="0"
                        disabled={loading}
                    />
                    <Input
                        label="When is your WIG goal due?"
                        name="wig_goal_date"
                        type="month"
                        placeHolder="Select Date"
                        autoComplete
                        disabled={loading}
                    />
                </Form>
                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={customRows || []}
                    />
                </div>
                <hr className="mt-0" />
            </FormikProvider>
            <div className="flex md:justify-end py-4 w-full mt-4">
                <Button
                    isSubmitting={loading}
                    variant="primary"
                    label="Save Changes"
                    className={"w-full lg:w-3/12 btn-md"}
                    onClick={formik?.submitForm}
                />
            </div>
        </div>
    );
};

export default Goals;
