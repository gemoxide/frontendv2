import Button from "../../../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../../../core/state/reducer/invitations";
import { RootState } from "../../../../../../../core/state/reducer";
import { useEffect, useMemo, useState } from "react";
import CustomDataTable from "../../../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../../../core/components/KebabDropdown";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../../../../../../core/components/Modal";
import { IInvitation } from "../../../../../../../core/interfaces/invitation.interface";
import { useParams } from "react-router-dom";
import { confirmDelete } from "../../../../../../../core/helpers/prompt";
import { toast } from "react-toastify";
import { PermissionType } from "../../../../../../../core/interfaces/routes.interface";

const InvitedUsers = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();

    const { getGymsInvitations, deleteInvitation, resendInvitation } =
        mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymsInvitationsData, loading: getGymsInvitationsLoading } =
        useSelector((state: RootState) => state.invitations.getGymsInvitations);

    const { id } = useParams();

    const {
        success: createInvitationSuccess,
        loading: createInvitationLoading,
    } = useSelector((state: RootState) => state.invitations.createInvitation);

    const {
        success: deleteInvitationSuccess,
        loading: deleteInvitationLoading,
    } = useSelector((state: RootState) => state.invitations.deleteInvitation);

    const {
        success: updateInvitationSuccess,
        loading: updateInvitationLoading,
    } = useSelector((state: RootState) => state.invitations.updateInvitation);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        let gymId;
        if (id) {
            gymId = id;
        } else {
            gymId = currentUser?.relationships?.user_gyms?.[0]?.id;
        }
        getGymsInvitations({
            id: gymId,
            page,
            per_page: perPage,
        });
    };

    useEffect(() => {
        const getAdminRoles = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminRoles);
    }, [page, perPage]);

    const loading = getGymsInvitationsLoading;

    const hasCreateInvitation = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.INVITATION_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteInvitation = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.INVITATION_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<IInvitation>[] = [
        {
            name: "Email",
            selector: (invitation) => invitation?.attributes?.email,
        },
        {
            name: "Role",
            selector: (invitation) => invitation?.attributes?.role,
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (invitation: any) => (
                <div className="w-full flex justify-end">
                    {(hasCreateInvitation || hasDeleteInvitation) && (
                        <KebabDropdown
                            placement="top"
                            lists={[
                                ...(hasCreateInvitation
                                    ? [
                                          {
                                              label: "Resend Invitation",
                                              action: async () => {
                                                  await resendInvitation(
                                                      invitation.id
                                                  );
                                                  toast.success(
                                                      "Invitation resent successfully"
                                                  );
                                              },
                                          },
                                      ]
                                    : []),
                                ...(hasDeleteInvitation
                                    ? [
                                          {
                                              label: "Delete",
                                              action: async () => {
                                                  const { isConfirmed } =
                                                      await confirmDelete(
                                                          "Invitation"
                                                      );
                                                  if (isConfirmed) {
                                                      deleteInvitation(
                                                          invitation.id
                                                      );
                                                  }
                                              },
                                              isDanger: true,
                                          },
                                      ]
                                    : []),
                            ]}
                        />
                    )}
                </div>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    useEffect(() => {
        if (!createInvitationLoading && createInvitationSuccess) {
            setIsOpenCreateUserModal(false);
            fetch();
        }
    }, [createInvitationLoading]);

    useEffect(() => {
        if (!deleteInvitationLoading && deleteInvitationSuccess) {
            fetch();
        }
    }, [deleteInvitationLoading]);

    useEffect(() => {
        if (!updateInvitationLoading && updateInvitationSuccess) {
            fetch();
            setIsOpenCreateUserModal(false);
            setSelectedUser(undefined);
        }
    }, [updateInvitationLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Invited Users
                </h1>
                {hasCreateInvitation && (
                    <Button
                        label="+ Invite User"
                        onClick={() => {
                            setIsOpenCreateUserModal(true);
                            setSelectedUser(undefined);
                        }}
                    />
                )}
            </div>
            <Modal
                isOpen={isOpenCreateUserModal}
                onClose={() => setIsOpenCreateUserModal(false)}
            >
                <CreateUserForm selectedUser={selectedUser} />
            </Modal>
            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getGymsInvitationsData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={getGymsInvitationsData?.meta?.total}
                    sortServer
                />
            </div>
        </div>
    );
};

export default InvitedUsers;
