import { useEffect, useState, useMemo } from "react";
import Section from "../../../core/components/Section";
import Tabs from "../../../core/components/Tabs";
import General from "./tabs/General";
import LeadManagement from "./tabs/LeadManagement";
import CoachingAssessment from "./tabs/CoachingAssessment";
import Gyms from "./tabs/Gyms/Gyms";
import UsersSettings from "./tabs";
import Groups from "./tabs/Groups/Groups";
import Goals from "./tabs/Goals";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/sales-agreements";
import { useParams } from "react-router-dom";
import SalesAgreement from "../salesAgreement/SalesAgreement";
import { PermissionType } from "../../../core/interfaces/routes.interface";
import Integration from "./tabs/Integration";

const OrganizationSettings = () => {
    const [tab, setTab] = useState(0);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const params = useParams();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data, loading } = useSelector(
        (state: RootState) =>
            state.salesAgreements.getOrganizationSalesAgreements
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

    const { getOrganizationSalesAgreements } = mapDispatchToProps();

    const fetch = async () => {
        getOrganizationSalesAgreements({
            id: params?.id,
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

    const hasUpdateOrganization = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.ORGANIZATION_UPDATE
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

    const hasViewOrganizationSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.ORGANIZATION_SALES_AGREEMENT_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const hasCreateOrganizationSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.ORGANIZATION_SALES_AGREEMENT_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateOrganizationSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.ORGANIZATION_SALES_AGREEMENT_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteOrganizationSalesAgreement = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.ORGANIZATION_SALES_AGREEMENT_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const hasViewGroup = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.GROUP_VIEW
            );
        }
        return false;
    }, [currentUser]);

    const tabs = [
        ...(hasUpdateOrganization
            ? [
                  {
                      name: "General",
                      component: <General />,
                  },
              ]
            : []),
        ...(hasViewGym
            ? [
                  {
                      name: "Locations",
                      component: <Gyms />,
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
        ...(hasViewGroup
            ? [
                  {
                      name: "Groups",
                      component: <Groups />,
                  },
              ]
            : []),

        {
            name: "Lead Management",
            component: <LeadManagement />,
        },
        {
            name: "Assessment",
            component: <CoachingAssessment />,
        },
        ...(hasViewOrganizationSalesAgreement
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
                              hasCreate={hasCreateOrganizationSalesAgreement}
                              hasEdit={hasUpdateOrganizationSalesAgreement}
                              hasDelete={hasDeleteOrganizationSalesAgreement}
                          />
                      ),
                  },
              ]
            : []),
        {
            name: "Goals",
            component: <Goals />,
        },
        {
            name: "Integration",
            component: <Integration />,
        },
    ];
    const { data: getOrganizationData } = useSelector(
        (state: RootState) => state.organizations.getOrganization
    );
    return (
        <Section
            title={`Organization ${getOrganizationData?.attributes.name || ""}`}
        >
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

export default OrganizationSettings;
