import { useState, useMemo } from "react";
import Section from "../../../core/components/Section";
import Input from "../../../core/components/Forms/Input";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToGyms } from "../../../core/state/reducer/gyms";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Modal from "../../../core/components/Modal";
import CreateMemberForm from "./CreateMemberForm";
import { IMember } from "../../../core/interfaces/members.interface";
import MembersTable from "./components/MembersTable";
import MemberFilters from "./components/Filters/MemberFilters";
import { exportMembersRequest, getMemberRequest } from "../../../core/services/members/members.service";

const Members = () => {
    const storedPerPage = localStorage.getItem("perPage");
    const defaultPerPage = 10;
    const perPageValue = storedPerPage ? +storedPerPage : defaultPerPage;
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<number>(perPageValue);
    const [isOpenCreateMemberModal, setIsOpenCreateMemberModal] =
        useState(false);
    const [selectedMember, setSelectedMember] = useState<any>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");
    const [jsStatus, setJsStatus] = useState("");
    const [salesAgreement, setSalesAgreement] = useState<number>();
    const [gym, setGym] = useState<number>();

    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { getGyms } = mapDispatchToGyms();

    const fetchGyms = async () => {
        getGyms({ per_page: 100, page: 1 });
    };
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    const handleEdit = (id: number) => {
        getMemberRequest(id).then(res => {
            setSelectedMember(res.data);
            setIsOpenCreateMemberModal(true);
        });
    };

    const { data, loading: getMembersLoading } = useSelector(
        (state: RootState) => state.members.getMembers
    );

    const { getMembers } = mapDispatchToProps();

    const { loading: createMemberLoading, success: createMemberSuccess } =
        useSelector((state: RootState) => state.members.createMember);

    const { loading: deleteMemberLoading } = useSelector(
        (state: RootState) => state.members.deleteMember
    );

    const { loading: updateMemberLoading, success: updateMemberSuccess } =
        useSelector((state: RootState) => state.members.updateMember);

    const {
        loading: createMemberLeadLoading,
        success: createMemberLeadSuccess,
    } = useSelector((state: RootState) => state.members.createMemberLead);

    const loading =
        deleteMemberLoading ||
        getMembersLoading ||
        createMemberLoading ||
        updateMemberLoading ||
        createMemberLeadLoading;

    const fetch = async () => {
        getMembers({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
            sales_agreement: salesAgreement,
            member_type: "members",
            gym_id: gym,
        });
    };

    useEffect(() => {
        localStorage.setItem("perPage", perPage ? perPage.toString() : "10");
        const getMembers = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getMembers);
    }, [page, perPage, orderBy, sortDirection, search, salesAgreement, gym]);

    useEffect(() => {
        if (!createMemberLoading && createMemberSuccess) {
            setIsOpenCreateMemberModal(false);
        }
    }, [createMemberLoading]);

    useEffect(() => {
        if (!updateMemberLoading && updateMemberSuccess) {
            setIsOpenCreateMemberModal(false);
            setSelectedMember(undefined);
        }
    }, [updateMemberLoading]);

    useEffect(() => {
        fetchGyms();
    }, []);

    const gymOptions = useMemo(() => {
        return getGymsData?.data?.map((gym) => {
            return {
                label: gym.attributes.name,
                value: gym.id,
            };
        });
    }, [getGymsLoading]);

    return (
        <Section
            title="Members"
            buttons={[
                {
                    label: "Export Results",
                    onClick: () =>
                        exportMembersRequest({ member_type: "members" }),
                    variant: "secondary",
                },
            ]}
        >
            <MemberFilters
                jsStatus={jsStatus}
                setJsStatus={setJsStatus}
                salesAgreement={salesAgreement}
                setSalesAgreement={setSalesAgreement}
                gymOptions={gymOptions}
                setGym={setGym}
                gym={gym}
            />
            <div className="shadow-lg rounded-md bg-white h-full p-8 mt-4">
                <Modal
                    isOpen={isOpenCreateMemberModal}
                    onClose={() => setIsOpenCreateMemberModal(false)}
                >
                    <CreateMemberForm selectedMember={selectedMember} />
                </Modal>
                <div className="w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        isNotFormHook
                        placeHolder={"Search by name email and phones"}
                        variant="secondary"
                        icon="search"
                    />
                </div>
                <MembersTable
                    members={data?.data}
                    handlePageChange={handlePageChange}
                    handlePerRowsChange={handlePerRowsChange}
                    handleSort={handleSort}
                    handleEdit={handleEdit}
                    loading={loading}
                    total={data?.meta.total}
                />
            </div>
        </Section>
    );
};

export default Members;
