import { useEffect, useState, useMemo } from "react";
import Section from "../../../core/components/Section";
import Tabs from "../../../core/components/Tabs";
import General from "./tabs/Generals";
import SalesAgreement from "../salesAgreement/SalesAgreement";
import UsersSettings from "./tabs/Users/index";
import Tasks from "./tabs/Tasks";
import Revenue from "./tabs/Revenue/Revenue";
import { mapDispatchToProps } from "../../../core/state/reducer/sales-agreements";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { PermissionType } from "../../../core/interfaces/routes.interface";
import Goals from "./tabs/Goals";
import Benchmarks from "./tabs/Benchmarks";
import Integration from "./tabs/Integration";

const GymSettings = () => {
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const params = useParams();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    // const navigate = useNavigate();
    // const isGroupGymFound = currentUser?.relationships?.groups?.some(
    //     (group) => {
    //         return group?.relationships?.gyms?.some(
    //             (gym) => gym.id == params?.id
    //         );
    //     }
    // );

    // const isUserGymFound = currentUser?.relationships?.user_gyms?.some(
    //     (gym) => gym.id == params?.id
    // );

    // if (params.id && !isGroupGymFound && !isUserGymFound) {
    //     navigate(ROUTES.USER.dashboard.key);
    // }

    const { data, loading } = useSelector(
        (state: RootState) => state.salesAgreements.getGymSalesAgreements
    );

    const { success: deleteGymSuccess, loading: deleteGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.deleteSalesAgreement
        );

    const { success: createGymSuccess, loading: createGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.createSalesAgreement
        );

    const { success: updateGymSuccess, loading: updateGymLoading } =
        useSelector(
            (state: RootState) => state.salesAgreements.updateSalesAgreement
        );

    const { getGymSalesAgreements } = mapDispatchToProps();

    const fetch = async () => {
        getGymSalesAgreements({
            id: currentUser?.relationships.user_gyms?.length
                ? currentUser?.relationships.user_gyms[0].id
                : params?.id,
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        fetch();
    }, [page, perPage]);

    useEffect(() => {
        if (!createGymLoading && createGymSuccess) {
            fetch();
        }
    }, [createGymLoading]);

    useEffect(() => {
        if (!deleteGymLoading && deleteGymSuccess) {
            fetch();
        }
    }, [deleteGymLoading]);

    useEffect(() => {
        if (!updateGymLoading && updateGymSuccess) {
            fetch();
        }
    }, [updateGymLoading]);

    const hasViewUser = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.USER_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const hasViewGym = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GYM_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const hasViewGymSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GYM_SALES_AGREEMENT_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const hasCreateGymSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GYM_SALES_AGREEMENT_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateGymSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GYM_SALES_AGREEMENT_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteGymSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GYM_SALES_AGREEMENT_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const tabs = [
        ...(hasViewGym
            ? [
                  {
                      name: "General",
                      component: <General />,
                  },
              ]
            : []),
        ...(hasViewGymSalesAgreement
            ? [
                  {
                      name: "Sales Agreements",
                      component: (
                          <SalesAgreement
                              isLoading={loading}
                              perPage={perPage}
                              salesAgreements={data}
                              setPage={setPage}
                              setPerPage={setPerPage}
                              hasCreate={hasCreateGymSalesAgreement}
                              hasEdit={hasUpdateGymSalesAgreement}
                              hasDelete={hasDeleteGymSalesAgreement}
                          />
                      ),
                  },
              ]
            : []),
        ...(hasViewUser
            ? [
                  {
                      name: "Users",
                      component: <UsersSettings />,
                  },
              ]
            : []),
        {
            name: "Tasks Management",
            component: <Tasks />,
        },
        {
            name: "Monthly Revenue",
            component: <Revenue />,
        },
        {
            name: "Goals",
            component: <Goals />,
        },
        {
            name: "Benchmarks",
            component: <Benchmarks />,
        },
        {
            name: "Integration",
            component: <Integration />,
        },
    ];

    return (
        <Section title="Location Settings">
            <div className="mt-8 rounded-lg py-4">
                {tabs && (
                    <Tabs
                        tabs={tabs}
                        current={tab || 0}
                        onChangeTab={(key) => setTab(key)}
                    />
                )}
            </div>
        </Section>
    );
};

export default GymSettings;
