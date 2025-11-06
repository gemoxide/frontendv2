import { useState, useEffect } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import CustomDataTable from "../../../../../core/components/DataTable";
import Input from "../../../../../core/components/Forms/Input";
import Select from "../../../../../core/components/Forms/Select";
import { memberTypeDropdown } from "../../../../../core/constants/member-type";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { TableColumn } from "react-data-table-component";
import { IGroupAssessmentMember } from "../../../../../core/interfaces/group-assessments.interface";

interface Props {
    selectedMembers: IGroupAssessmentMember[];
    setSelectedMembers: React.Dispatch<
        React.SetStateAction<IGroupAssessmentMember[]>
    >;
    onChangeType: (type: "Standard" | "Optimal Life") => void;
}

const MembersTable: React.FC<Props> = ({
    selectedMembers,
    setSelectedMembers,
    onChangeType,
}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [type, setType] = useState<"Standard" | "Optimal Life" | undefined>(
        undefined
    );
    const { getGymMembers } = mapDispatchToProps();

    const { data, loading } = useSelector(
        (state: RootState) => state.members.getGymMembers
    );

    const fetch = async () => {
        getGymMembers({
            page,
            per_page: perPage,
            search,
            type,
        });
    };

    useEffect(() => {
        const getGymMembers = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getGymMembers);
    }, [page, perPage, type, search]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const columns: TableColumn<IGroupAssessmentMember>[] = [
        {
            name: "Name",
            cell: (member) =>
                `${member?.attributes?.first_name} ${member?.attributes?.last_name}`,
        },
        {
            name: "Type",
            cell: (member) => (
                <div className="bg-[#D5C6FF] py-1 px-3 rounded-3xl">
                    {member?.attributes?.type}
                </div>
            ),
        },
        {
            name: "",
            width: "10%",
            cell: (member) => (
                <UserPlusIcon
                    width={20}
                    className="cursor-pointer"
                    onClick={() =>
                        setSelectedMembers([...selectedMembers, member])
                    }
                />
            ),
        },
    ];
    return (
        <div className="w-8/12 flex flex-col gap-y-3">
            <div className="w-full bg-white shadow-lg p-3 rounded-lg flex gap-x-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    isNotFormHook
                    placeHolder={"Search by name"}
                    variant="secondary"
                    icon="search"
                    className="w-1/2"
                />
                <Select
                    name="type"
                    placeHolder="Member Type"
                    autoComplete
                    variant="default"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value as typeof type);
                        onChangeType(
                            e.target.value as "Standard" | "Optimal Life"
                        );
                    }}
                    isNotFormHook
                    options={memberTypeDropdown}
                    className="w-auto"
                />
            </div>
            <div className="w-full bg-white shadow-lg p-3 rounded-lg">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={
                        data?.data.filter(
                            (data) =>
                                !selectedMembers.some(
                                    (member) => member.id === data.id
                                )
                        ) || []
                    }
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={data?.meta?.total}
                    paginationPerPage={perPage}
                    isHideRowPerPage
                    sortServer
                />
            </div>
        </div>
    );
};

export default MembersTable;
