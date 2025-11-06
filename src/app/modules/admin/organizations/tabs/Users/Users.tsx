import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../core/state/reducer/admin-users";
import { RootState } from "../../../../../core/state/reducer";
import { useEffect, useState } from "react";
import CustomDataTable from "../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../../../../core/components/Modal";
import { IUser } from "../../../../../core/interfaces/user.interface";
import ChangePasswordForm from "./ChangePasswordForm";
import { useParams } from "react-router-dom";
import Button from "../../../../../core/components/Button";
import { confirmDelete } from "../../../../../core/helpers/prompt";

const Users = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
        useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const { getAdminOrganizationUsers, deleteAdminUser } = mapDispatchToProps();

    const { data: getUsersData, loading: getUsersLoading } = useSelector(
        (state: RootState) => state.adminUsers.getAdminOrganizationUsers
    );
    const { id } = useParams();

    const { success: createUserSuccess, loading: createUserLoading } =
        useSelector((state: RootState) => state.adminUsers.createAdminUser);

    const { success: deleteUserSuccess, loading: deleteUserLoading } =
        useSelector((state: RootState) => state.adminUsers.deleteAdminUser);

    const { success: updateSuccess, loading: updateUserLoading } = useSelector(
        (state: RootState) => state.adminUsers.updateAdminUser
    );

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        getAdminOrganizationUsers({
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

    const loading = getUsersLoading;

    const columns: TableColumn<IUser>[] = [
        {
            name: "Email",
            selector: (user) => user?.attributes?.email,
        },
        {
            name: "Role",
            cell: (user) => user?.relationships?.roles?.[0]?.attributes?.name,
        },
        {
            name: "Status",
            cell: (user) =>
                user?.attributes?.active ? (
                    <>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Active
                        </span>
                    </>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Inactive
                    </span>
                ),
        },

        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (user: any) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Edit",
                                action: () => {
                                    setSelectedUser(user);
                                    setIsOpenCreateUserModal(true);
                                },
                            },
                            {
                                label: "Change Password",
                                action: () => {
                                    setSelectedUser(user);
                                    setIsOpenChangePasswordModal(true);
                                },
                            },
                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "User"
                                    );
                                    if (isConfirmed) {
                                        deleteAdminUser(user.id);
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
        if (!createUserLoading && createUserSuccess) {
            setIsOpenCreateUserModal(false);
            setIsOpenChangePasswordModal(false);
            fetch();
        }
    }, [createUserLoading]);

    useEffect(() => {
        if (!deleteUserLoading && deleteUserSuccess) {
            fetch();
        }
    }, [deleteUserLoading]);

    useEffect(() => {
        if (!updateUserLoading && updateSuccess) {
            fetch();
            setIsOpenCreateUserModal(false);
            setIsOpenChangePasswordModal(false);
            setSelectedUser(undefined);
        }
    }, [updateUserLoading]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Organization Users
                </h1>
                <Button
                    label="+ Create User"
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

            <Modal
                isOpen={isOpenChangePasswordModal}
                onClose={() => setIsOpenChangePasswordModal(false)}
            >
                <ChangePasswordForm
                    selectedUser={selectedUser}
                    modalClose={() => setIsOpenChangePasswordModal(false)}
                />
            </Modal>
            <div className="mt-8">
                <CustomDataTable
                    loading={loading}
                    columns={columns}
                    data={getUsersData?.data || []}
                    pagination
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={getUsersData?.meta?.total}
                    sortServer
                />
            </div>
        </div>
    );
};

export default Users;
