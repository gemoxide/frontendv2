import { useState, useMemo } from "react";
import Section, { Buttons } from "../../../core/components/Section";
import Input from "../../../core/components/Forms/Input";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToGyms } from "../../../core/state/reducer/gyms";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Modal from "../../../core/components/Modal";
import CreateMemberLeadForm from "./CreateMemberLeadForm";
import { IMember } from "../../../core/interfaces/members.interface";
import LeadsTable from "./components/LeadsTable";
import LeadFilters from "./components/Filters/LeadFilters";
import { exportMembersRequest, getMemberRequest } from "../../../core/services/members/members.service";
import { PermissionType } from "../../../core/interfaces/routes.interface";

const Members = () => {
    const storedPerPage = localStorage.getItem("perPage");
    const defaultPerPage = 10;
    const perPageValue = storedPerPage ? +storedPerPage : defaultPerPage;
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<number>(perPageValue);
    const [isOpenCreateMemberLeadModal, setIsOpenCreateMemberLeadModal] =
        useState(false);
    const [selectedMember, setSelectedMember] = useState<IMember>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");
    const [leadSource, setLeadSource] = useState("");
    const [gym, setGym] = useState<number | undefined>(0);
    const [gymTour, setGymTour] = useState("");

    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { getGyms } = mapDispatchToGyms();

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const fetchGyms = async () => {
        getGyms({ per_page: 100, page: 1 });
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
            setIsOpenCreateMemberLeadModal(true);
        });
    };

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data, loading: getMembersLoading } = useSelector(
        (state: RootState) => state.members.getMembers
    );

    const { getMembers } = mapDispatchToProps();

    const { loading: deleteMemberLoading } = useSelector(
        (state: RootState) => state.members.deleteMember
    );

    const {
        loading: updateMemberLeadLoading,
        success: updateMemberLeadSuccess,
    } = useSelector((state: RootState) => state.members.updateMemberLead);

    const {
        loading: createMemberLeadLoading,
        success: createMemberLeadSuccess,
    } = useSelector((state: RootState) => state.members.createMemberLead);

    const loading =
        deleteMemberLoading ||
        getMembersLoading ||
        updateMemberLeadLoading ||
        createMemberLeadLoading;

    const fetch = async () => {
        getMembers({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
            lead_source: leadSource,
            member_type: "leads",
            gym_id: gym,
            gym_tour: gymTour,
        });
    };

    useEffect(() => {
        localStorage.setItem("perPage", perPage ? perPage.toString(): "10");
        const getMembers = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getMembers);
    }, [
        page,
        perPage,
        orderBy,
        sortDirection,
        search,
        leadSource,
        gym,
        gymTour,
    ]);

    useEffect(() => {
        if (!createMemberLeadLoading && createMemberLeadSuccess) {
            setIsOpenCreateMemberLeadModal(false);
        }
    }, [createMemberLeadLoading, createMemberLeadSuccess]);

    useEffect(() => {
        if (!createMemberLeadLoading && updateMemberLeadSuccess) {
            setIsOpenCreateMemberLeadModal(false);
        }
    }, [createMemberLeadLoading, updateMemberLeadSuccess]);

    const hasCreateMember = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.MEMBER_CREATE
            );
        }
        return false;
    }, [currentUser]);

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
            title="Leads"
            buttons={[
                {
                    label: "Export Results",
                    onClick: () =>
                        exportMembersRequest({ member_type: "leads" }),
                    variant: "secondary",
                },
                ...(hasCreateMember
                    ? [
                          {
                              label: "Add Lead +",
                              onClick: () => {
                                  setSelectedMember(undefined);
                                  setIsOpenCreateMemberLeadModal(true);
                              },
                              variant: "primary",
                          } as Buttons,
                      ]
                    : []),
            ]}
        >
            <LeadFilters
                leadSource={leadSource}
                setLeadSource={setLeadSource}
                gymOptions={gymOptions}
                setGym={setGym}
                gym={gym}
                gymTour={gymTour}
                setGymTour={setGymTour}
            />
            <div className="shadow-lg rounded-md bg-white h-full p-8 mt-4">
                <Modal
                    isOpen={isOpenCreateMemberLeadModal}
                    onClose={() => setIsOpenCreateMemberLeadModal(false)}
                >
                    <CreateMemberLeadForm selectedMember={selectedMember} />
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
                <LeadsTable
                    isLead
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
