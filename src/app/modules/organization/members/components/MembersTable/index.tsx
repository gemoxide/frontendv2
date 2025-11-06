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

const MembersTable: React.FC<Props> = ({
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
            name: "JS Progress",
            width: "25%",
            sortable: true,
            cell: (member) => (
                <div className="grid grid-cols-4 gap-x-2 justify-between w-full font-bold">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        {member?.attributes?.js1_schedule_date_formatted ? (
                            <CustomIcon
                                icon="js1Scheduled"
                                className="w-8 h-8"
                            />
                        ) : (
                            <CustomIcon
                                icon="js1ScheduledGrey"
                                className="w-8 h-8"
                            />
                        )}
                        <span className="text-xs">
                            {member?.attributes?.js1_schedule_date_formatted
                                ? member?.attributes
                                      ?.js1_schedule_date_formatted
                                : "\u00A0"}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        {member?.attributes?.js1_deck_attached_formatted ? (
                            <CustomIcon
                                icon="js1Completed"
                                className="w-8 h-8"
                            />
                        ) : (
                            <CustomIcon
                                icon="js1CompletedGrey"
                                className="w-8 h-8"
                            />
                        )}
                        <span className="text-xs">
                            {member?.attributes?.js1_deck_attached_formatted
                                ? member?.attributes
                                      ?.js1_deck_attached_formatted
                                : "\u00A0"}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        {member?.attributes?.js3_schedule_date_formatted ? (
                            <CustomIcon
                                icon="js3Scheduled"
                                className="w-8 h-8"
                            />
                        ) : (
                            <CustomIcon
                                icon="js3ScheduledGrey"
                                className="w-8 h-8"
                            />
                        )}
                        <span className="text-xs">
                            {member?.attributes?.js3_schedule_date_formatted
                                ? member?.attributes
                                      ?.js3_schedule_date_formatted
                                : "\u00A0"}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        {member?.attributes?.js3_deck_attached_formatted ? (
                            <CustomIcon
                                icon="js3Completed"
                                className="w-8 h-8"
                            />
                        ) : (
                            <CustomIcon
                                icon="js3CompletedGrey"
                                className="w-8 h-8"
                            />
                        )}
                        <span className="text-xs">
                            {member?.attributes?.js3_deck_attached_formatted
                                ? member?.attributes
                                      ?.js3_deck_attached_formatted
                                : "\u00A0"}
                        </span>
                    </div>
                </div>
            ),
            center: true,
        },
        {
            name: "Membership Ends",
            width: "12%",
            cell: (member) => (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    {member?.attributes?.current_mem_agree_end && (
                        <>
                            {new Date(member.attributes.current_mem_agree_end) >
                            new Date() ? (
                                <CustomIcon
                                    icon="autoRenew"
                                    className="w-8 h-8"
                                />
                            ) : (
                                <CustomIcon
                                    icon="autoRenewGrey"
                                    className="w-8 h-8"
                                />
                            )}
                            <span className="text-xs font-semibold">
                                {dateWithDot(
                                    member?.attributes?.current_mem_agree_end
                                )}
                            </span>
                        </>
                    )}
                </div>
            ),
            center: true,
        },
        {
            name: "PT Ends",
            width: "12%",
            cell: (member) => (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    {member?.attributes?.current_pt_agree_end && (
                        <>
                            {new Date(member.attributes.current_pt_agree_end) >
                            new Date() ? (
                                <CustomIcon
                                    icon="autoRenew"
                                    className="w-8 h-8"
                                />
                            ) : (
                                <CustomIcon
                                    icon="autoRenewGrey"
                                    className="w-8 h-8"
                                />
                            )}
                            <span className="text-xs font-semibold">
                                {dateWithDot(
                                    member?.attributes?.current_pt_agree_end
                                )}
                            </span>
                        </>
                    )}
                </div>
            ),
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

export default MembersTable;
