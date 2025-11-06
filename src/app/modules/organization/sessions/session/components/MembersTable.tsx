import { useState, useEffect } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import CustomDataTable from "../../../../../core/components/DataTable";
import Input from "../../../../../core/components/Forms/Input";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { TableColumn } from "react-data-table-component";
import { ISessionMember } from "../../../../../core/interfaces/sessions.interface";

interface Props {
    selectedMembers: ISessionMember[];
    setSelectedMembers: React.Dispatch<React.SetStateAction<ISessionMember[]>>;
}

const MembersTable: React.FC<Props> = ({
    selectedMembers,
    setSelectedMembers,
}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const { getGymMembers } = mapDispatchToProps();

    const { data, loading } = useSelector(
        (state: RootState) => state.members.getGymMembers
    );

    const fetch = async () => {
        getGymMembers({
            page,
            per_page: perPage,
            search,
        });
    };

    useEffect(() => {
        const getGymMembers = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getGymMembers);
    }, [page, perPage, search]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const columns: TableColumn<ISessionMember>[] = [
        {
            name: "Name",
            cell: (member) =>
                `${member?.attributes?.first_name} ${member?.attributes?.last_name}`,
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
