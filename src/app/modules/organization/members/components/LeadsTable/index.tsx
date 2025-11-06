import { useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import CustomDataTable from "../../../../../core/components/DataTable";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import { IMember } from "../../../../../core/interfaces/members.interface";
import Contact from "../Contact";
import Tasks from "../Tasks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../core/constants/routes";
import { confirmDelete } from "../../../../../core/helpers/prompt";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { PermissionType } from "../../../../../core/interfaces/routes.interface";
import { dateWithDot } from "../../../../../core/services/utils/utils.service";
import CustomIcon from "../../../../../core/components/CustomIcon";

interface Props {
    members?: IMember[];
    handlePageChange: (page: number) => void;
    handlePerRowsChange: (newPerPage: number, page: number) => void;
    handleSort: (column: any, sortDirection: string) => void;
    handleEdit: (id: number) => void;
    loading: boolean;
    total?: number;
    isLead?: boolean;
}

const LeadsTable: React.FC<Props> = ({
    members = [],
    handlePageChange,
    handlePerRowsChange,
    handleSort,
    loading,
    handleEdit,
    total = 0,
    isLead = false,
}) => {
    const navigate = useNavigate();

    const { deleteMember } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const hasUpdateMember = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.MEMBER_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteMember = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.MEMBER_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<IMember>[] = [
        {
            name: "Contact",
            cell: (member) => (
                <Contact
                    avatar={member?.attributes?.avatar}
                    name={`${member?.attributes?.first_name} ${member?.attributes?.last_name}`}
                    createdAt={member?.attributes?.member_since}
                />
            ),
            width: "25%",
            sortable: true,
            sortField: "name",
        },
        {
            name: "Lead Source",
            sortable: true,
            cell: (member) => (
                <span className="capitalize">
                    {member?.attributes?.lead_source}
                </span>
            ),
        },
        {
            name: "Lead Acquired Date",
            sortable: true,
            cell: (member) => (
                <span className="font-bold">
                    {member?.attributes?.lead_acquired_at
                        ? dateWithDot(member?.attributes?.lead_acquired_at)
                        : ""}
                </span>
            ),
        },
        {
            name: "Gym Tour Date",
            sortable: true,
            cell: (member) => (
                <span className="font-bold">
                    {member?.attributes?.gym_tour_at
                        ? dateWithDot(member?.attributes?.gym_tour_at)
                        : ""}
                </span>
            ),
        },
        {
            name: "Follow up",
            cell: (member) => {
                let status = null;
                switch (member?.attributes?.contact_status) {
                    case "moved":
                        status = "contactMoved";
                        break;
                    case "do_not_contact":
                        status = "contactDoNotCall";
                        break;
                    case "contact":
                        status = "contactCall";
                        break;
                    default:
                        break;
                }
                return status ? (
                    <CustomIcon icon={status} className="w-10 h-10" />
                ) : null;
            },
            center: true,
        },

        {
            name: "Tasks",
            sortable: true,
            cell: (member) => (
                <Tasks
                    tasks={member?.attributes?.total_tasks}
                    overdue={member?.attributes?.total_overdue_tasks}
                />
            ),
            center: true,
        },
        {
            name: "Language",
            sortable: true,
            cell: (member) => member?.attributes?.language,
        },
        {
            name: "",
            sortable: false,
            cell: (member) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: isLead ? "Manage Lead" : "Manage Member",
                                action: () => {
                                    navigate(
                                        isLead
                                            ? ROUTES.USER.lead.parse(member.id)
                                            : ROUTES.USER.member.parse(
                                                  member.id
                                              )
                                    );
                                },
                            },
                            ...(hasUpdateMember
                                ? [
                                      {
                                          label: isLead
                                              ? "Edit Lead"
                                              : "Edit Member",
                                          action: () => {
                                              handleEdit(member.id);
                                          },
                                      },
                                  ]
                                : []),
                            ...(hasDeleteMember
                                ? [
                                      {
                                          label: "Delete",
                                          action: async () => {
                                              const { isConfirmed } =
                                                  await confirmDelete(
                                                      isLead ? "Lead" : "Member"
                                                  );
                                              if (isConfirmed) {
                                                  deleteMember(member?.id);
                                              }
                                          },
                                          isDanger: true,
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="mt-8">
            <CustomDataTable
                loading={loading}
                columns={columns}
                data={members}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={total}
                onSort={handleSort}
                isHideRowPerPage
                sortServer
            />
        </div>
    );
};

export default LeadsTable;
