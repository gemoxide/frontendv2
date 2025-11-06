import { useState } from "react";
import Section from "../../../core/components/Section";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-organizations";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { useParams } from "react-router-dom";
import UnderLineTabs from "../../../core/components/Tabs/UnderLineTabs";
import Users from "./tabs/Users/Users";
import InvitedUsers from "./tabs/Invited/InvitedUsers";
import Gyms from "./tabs/Gyms/Gyms";

const ViewOrganization = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");
    const params = useParams();

    const { data, loading } = useSelector(
        (state: RootState) => state.adminOrganizations.getAdminOrganization
    );

    const { getAdminOrganization } = mapDispatchToProps();

    const fetch = async () => {
        getAdminOrganization({
            id: params?.id,
        });
    };

    useEffect(() => {
        const getAdminOrganizations = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminOrganizations);
    }, [page, perPage, orderBy, sortDirection, search]);

    const [tab, setTab] = useState(0);
    const tabs = [
        {
            name: "Users",
            component: <Users />,
        },
        {
            name: "Invitations",
            component: <InvitedUsers />,
        },
        {
            name: "Locations",
            component: <Gyms />,
        },
    ];

    return (
        <div className="block lg:flex">
            <Section title="Organizations" className="w-full lg:w-9/12">
                <div className="rounded-lg">
                    {tabs && (
                        <UnderLineTabs
                            tabs={tabs}
                            current={tab || 0}
                            onChangeTab={(key) => setTab(key)}
                        />
                    )}
                </div>
            </Section>
            <div className="w-full lg:w-1/3 max-h-80 bg-white p-8">
                <h1 className="font-bold text-lg mb-2">
                    {data?.data?.attributes?.name}
                </h1>
                <div className="border-b"></div>
                <div className=" mb-10 mt-4 flex justify-between">
                    <p className="font-bold">Status</p>
                    {data?.data?.attributes ? (
                        <>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Active
                            </span>
                        </>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            Inactive
                        </span>
                    )}
                </div>
                <div className=" mb-10 mt-4 flex justify-between">
                    <p className="font-bold"># Users</p>
                    <p className="font-bold">
                        {data?.data?.attributes?.total_users}
                    </p>
                </div>
                <div className=" mb-10 mt-4 flex justify-between">
                    <p className="font-bold"># Members</p>
                    <p className="font-bold">
                        {data?.data?.attributes?.total_members}
                    </p>
                </div>
                <div className=" mb-10 mt-4 flex justify-between">
                    <p className="font-bold"># PT Clients</p>
                    <p className="font-bold">
                        {data?.data?.attributes?.pt_clients}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewOrganization;
