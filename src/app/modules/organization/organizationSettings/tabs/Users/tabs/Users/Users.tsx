import Button from "../../../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../../../../core/state/reducer/users";
import { RootState } from "../../../../../../../core/state/reducer";
import { useEffect, useMemo, useState } from "react";
import CustomDataTable from "../../../../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import KebabDropdown from "../../../../../../../core/components/KebabDropdown";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../../../../../../core/components/Modal";
import { IUser } from "../../../../../../../core/interfaces/user.interface";
import ChangePasswordForm from "./ChangePasswordForm";
import { mapDispatchToProps as mapDispatchToPropsGym } from "../../../../../../../core/state/reducer/gyms";
import Filters from "../../components/Filters";
import { confirmDelete } from "../../../../../../../core/helpers/prompt";
import { PermissionType } from "../../../../../../../core/interfaces/routes.interface";
import { ROUTES } from "../../../../../../../core/constants/routes";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
        useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [role, setRole] = useState("");
    const [gymId, setGymId] = useState("");
    const [search, setSearch] = useState("");
    const { getUsers, deleteUser } = mapDispatchToProps();

    const { data: getUsersData, loading: getUsersLoading } = useSelector(
        (state: RootState) => state.users.getUsers
    );

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { success: createUserSuccess, loading: createUserLoading } =
        useSelector((state: RootState) => state.invitations.createInvitation);

    const { success: deleteUserSuccess, loading: deleteUserLoading } =
        useSelector((state: RootState) => state.users.deleteUser);

    const { success: updateSuccess, loading: updateUserLoading } = useSelector(
        (state: RootState) => state.users.updateUser
    );

    useEffect(() => {
        getGyms({ per_page: 100, page: 1 });
        fetch();
    }, []);

    const navigate = useNavigate();

    const fetch = async () => {
        getUsers({
            page,
            per_page: perPage,
            gym_id: gymId,
            role: role,
            search: search,
        });
    };

    useEffect(() => {
        const getAdminRoles = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminRoles);
    }, [page, perPage, gymId, role, search]);

    const loading = getUsersLoading;

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

    const hasUpdateUser = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.USER_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const handleViewUser = (user: IUser) => {
        navigate(ROUTES.USER.userProfile.parse(user.id.toString()));
    };

    const hasDeleteUser = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.USER_DELETE
            );
        }
        return false;
    }, [currentUser]);

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
            name: "Location",
            cell: (user) =>
                user?.relationships?.user_gyms &&
                user?.relationships?.user_gyms.map((gym) => {
                    return <>{gym.attributes.name}</>;
                }),
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
                            ...(hasUpdateUser
                                ? [
                                      {
                                          label: "Manage User",
                                          action: () => handleViewUser(user),
                                      },
                                  ]
                                : []),

                            {
                                label: "Change Password",
                                action: () => {
                                    setSelectedUser(user);
                                    setIsOpenChangePasswordModal(true);
                                },
                            },
                            ...(hasDeleteUser
                                ? [
                                      {
                                          label: "Delete",
                                          action: async () => {
                                              const { isConfirmed } =
                                                  await confirmDelete("User");
                                              if (isConfirmed) {
                                                  deleteUser(user.id);
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

    const { getGyms } = mapDispatchToPropsGym();

    const { data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const gymOptions = useMemo(() => {
        return (
            getGymsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getGymsData]);

    return (
        <>
            <div className="w-full bg-white rounded-lg p-8 shadow-lg mt-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold text-secondary">
                        Organization Users
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

                <Modal
                    isOpen={isOpenChangePasswordModal}
                    onClose={() => setIsOpenChangePasswordModal(false)}
                >
                    <ChangePasswordForm
                        selectedUser={selectedUser}
                        modalClose={() => setIsOpenChangePasswordModal(false)}
                    />
                </Modal>
                <Filters
                    search={search}
                    setSearch={setSearch}
                    gymId={gymId}
                    setGymId={setGymId}
                    setRole={setRole}
                    role={role}
                    setPerPage={setPerPage}
                    perPage={perPage}
                    gymOptions={gymOptions}
                />
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
                        isHideRowPerPage
                        sortServer
                    />
                </div>
            </div>
        </>
    );
};

export default Users;
