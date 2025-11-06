import { useMemo, useState } from "react";
import Section from "../../../core/components/Section";
import Input from "../../../core/components/Forms/Input";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-users";
import { mapDispatchToProps as mapDispatchToAuthProps } from "../../../core/state/reducer/auth";
import { mapDispatchToProps as mapDispatchToOrganizationProps } from "../../../core/state/reducer/admin-organizations";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Modal from "../../../core/components/Modal";
import CreateUserForm from "./CreateUserForm";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { IUser } from "../../../core/interfaces/user.interface";
import { confirmDelete } from "../../../core/helpers/prompt";
import Select from "../../../core/components/Forms/Select";
import { redirect } from "react-router-dom";
import ChangePasswordForm from "../organizations/tabs/Users/ChangePasswordForm";

const Users = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");
    const [organization, setOrganization] = useState("");
    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
        useState(false);

    const { getAdminOrganizations } = mapDispatchToOrganizationProps();
    const { impersonateUser } = mapDispatchToAuthProps();

    const { data, loading } = useSelector(
        (state: RootState) => state.adminUsers.getAdminUsers
    );

    const { data: getOrganizationsData, loading: getOrganizationsLoading } =
        useSelector(
            (state: RootState) => state.adminOrganizations.getAdminOrganizations
        );

    const { getAdminUsers, deleteAdminUser } = mapDispatchToProps();

    const { loading: impersonateUserLoading, success: impersonateUserSuccess } =
        useSelector((state: RootState) => state.auth.impersonateUser);

    const { loading: createAdminUserLoading, success: createAdminUserSuccess } =
        useSelector((state: RootState) => state.adminUsers.createAdminUser);

    const { loading: deleteAdminUserLoading, success: deleteAdminUserSuccess } =
        useSelector((state: RootState) => state.adminUsers.deleteAdminUser);

    const { loading: updateAdminRoleLoading, success: updateAdminRoleSuccess } =
        useSelector((state: RootState) => state.adminUsers.updateAdminUser);

    const columns: TableColumn<IUser>[] = [
        {
            name: "Name",
            cell: (user) => (
                <span>
                    {`${user?.attributes?.first_name}  ${user?.attributes?.last_name}`}
                </span>
            ),
            sortable: true,
            sortField: "first_name",
        },
        {
            name: "Email",
            selector: (user) => user?.attributes?.email,
            sortable: true,
            sortField: "email",
        },
        {
            name: "Roles",
            cell: (user) => user?.relationships?.roles?.[0]?.attributes?.name,
        },
        {
            name: "Type",
            cell: (user) => (
                <span className="capitalize"> {user?.attributes?.type} </span>
            ),
        },
        {
            name: "Organization",
            cell: (user) => user?.relationships?.organization?.attributes.name,
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
                                        deleteAdminUser(user?.id);
                                    }
                                },
                                isDanger: true,
                            },
                            ...(user?.attributes?.type === "user"
                                ? [
                                      {
                                          label: "Impersonate",
                                          action: () => {
                                              impersonateUser(user.id);
                                          },
                                      },
                                  ]
                                : []),
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

    const fetchOrganizations = async () => {
        getAdminOrganizations({
            per_page: 200,
        });
    };

    const fetch = async () => {
        getAdminUsers({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
            organization: organization,
        });
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    useEffect(() => {
        const getAdminUsers = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminUsers);
    }, [page, perPage, orderBy, sortDirection, search, organization]);

    useEffect(() => {
        if (!createAdminUserLoading && createAdminUserSuccess) {
            setIsOpenCreateUserModal(false);
            fetch();
        }
    }, [createAdminUserLoading]);

    useEffect(() => {
        if (!impersonateUserLoading && impersonateUserSuccess) {
            location.replace("/dashboard");
        }
    }, [impersonateUserLoading]);

    useEffect(() => {
        if (!deleteAdminUserLoading && deleteAdminUserSuccess) {
            fetch();
        }
    }, [deleteAdminUserLoading]);

    useEffect(() => {
        if (!updateAdminRoleLoading && updateAdminRoleSuccess) {
            fetch();
            setIsOpenCreateUserModal(false);
            setSelectedUser(undefined);
        }
    }, [updateAdminRoleLoading]);

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    const organizationsOptions = useMemo(() => {
        return (
            getOrganizationsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getOrganizationsData]);

    return (
        <Section
            title="Users"
            rightButtonLabel="Add User"
            rightButtonOnclick={() => {
                setSelectedUser(undefined);
                setIsOpenCreateUserModal(true);
            }}
        >
            <div className="shadow-lg rounded-md bg-white h-full p-8">
                <Modal
                    isOpen={isOpenCreateUserModal}
                    onClose={() => setIsOpenCreateUserModal(false)}
                >
                    <CreateUserForm selectedUser={selectedUser} />
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
                <div className="w-full flex gap-x-3">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        isNotFormHook
                        placeHolder={"Search..."}
                        variant="secondary"
                        icon="search"
                        className="grow"
                    />
                    <Select
                        placeHolder="Select Organization"
                        inputClassName="w-full"
                        name="organization"
                        variant="default"
                        isNotFormHook
                        options={organizationsOptions}
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                </div>
                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={data?.data || []}
                        pagination
                        paginationServer
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationTotalRows={data?.meta?.total}
                        onSort={handleSort}
                        sortServer
                    />
                </div>
            </div>
        </Section>
    );
};

export default Users;
