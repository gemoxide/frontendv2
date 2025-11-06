import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/invitations";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../../../../core/components/Modal";
import { IInvitation } from "../../../../../core/interfaces/invitation.interface";
import { useParams } from "react-router-dom";
import { confirmDelete } from "../../../../../core/helpers/prompt";
import { toast } from "react-toastify";

const InvitedUsers = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();

    const {
        getOrganizationInvitedUsers,
        deleteInvitation,
        resendOrganizationInvitation,
    } = mapDispatchToProps();

    const { data: getGymsInvitationsData, loading: getGymsInvitationsLoading } =
        useSelector(
            (state: RootState) => state.invitations.getOrganizationInvitedUsers
        );

    const { id } = useParams();

    const {
        success: createInvitationSuccess,
        loading: createInvitationLoading,
    } = useSelector(
        (state: RootState) => state.invitations.createOrganizationInvitation
    );

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
        getOrganizationInvitedUsers({
            id: id,
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
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Resend Invitation",
                                action: async () => {
                                    await resendOrganizationInvitation(
                                        invitation.id
                                    );
                                    toast.success(
                                        "Invitation resent successfully"
                                    );
                                },
                            },
                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "Invitation"
                                    );
                                    if (isConfirmed) {
                                        deleteInvitation(invitation.id);
                                    }
                                },
                                isDanger: true,
                            },
                        ]}
                    />
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
                <Button
                    label="+ Invite User"
                    onClick={() => {
                        setIsOpenCreateUserModal(true);
                        setSelectedUser(undefined);
                    }}
                />
            </div>
            <Modal
                isOpen={isOpenCreateUserModal}
                onClose={() => setIsOpenCreateUserModal(false)}
            >
                <CreateUserForm
                    selectedUser={selectedUser}
                    organizationId={id}
                />
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
