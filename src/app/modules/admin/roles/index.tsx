import { useState } from "react";
import Section from "../../../core/components/Section";
import Input from "../../../core/components/Forms/Input";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-roles";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Modal from "../../../core/components/Modal";
import CreateRoleForm from "./components/CreateRoleForm";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { IRole } from "../../../core/interfaces/roles.interface";
import { confirmDelete } from "../../../core/helpers/prompt";

const Role = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateRoleModal, setIsOpenCreateRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");

    const { data, loading } = useSelector(
        (state: RootState) => state.adminRoles.getAdminRoles
    );

    const {
        loading: createAdminRolesLoading,
        success: createAdminRolesSuccess,
    } = useSelector((state: RootState) => state.adminRoles.createAdminRole);

    const { loading: deleteAdminRoleLoading, success: deleteAdminRoleSuccess } =
        useSelector((state: RootState) => state.adminRoles.deleteAdminRole);

    const { loading: updateAdminRoleLoading, success: updateAdminRoleSuccess } =
        useSelector((state: RootState) => state.adminRoles.updateAdminRole);

    const { getAdminRoles, deleteAdminRole } = mapDispatchToProps();

    const columns: TableColumn<IRole>[] = [
        {
            name: "Name",
            cell: (role) => role?.attributes?.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "Type",
            cell: (role) => (
                <span className="capitalize"> {role?.attributes?.type} </span>
            ),
            sortable: true,
            sortField: "type",
        },
        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (role: any) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Edit",
                                action: () => {
                                    setSelectedRole(role);
                                    setIsOpenCreateRoleModal(true);
                                },
                            },

                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "Role"
                                    );
                                    if (isConfirmed) {
                                        deleteAdminRole(role?.id);
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

    const fetch = async () => {
        getAdminRoles({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
        });
    };

    useEffect(() => {
        const getAdminRoles = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminRoles);
    }, [page, perPage, orderBy, sortDirection, search]);

    useEffect(() => {
        if (!createAdminRolesLoading && createAdminRolesSuccess) {
            setIsOpenCreateRoleModal(false);
            fetch();
        }
    }, [createAdminRolesLoading]);

    useEffect(() => {
        if (!deleteAdminRoleLoading && deleteAdminRoleSuccess) {
            fetch();
        }
    }, [deleteAdminRoleLoading]);

    useEffect(() => {
        if (!updateAdminRoleLoading && updateAdminRoleSuccess) {
            fetch();
            setIsOpenCreateRoleModal(false);
            setSelectedRole(undefined);
        }
    }, [updateAdminRoleLoading]);

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    return (
        <Section
            title="Roles"
            rightButtonLabel="Add role"
            rightButtonOnclick={() => {
                setIsOpenCreateRoleModal(true);
                setSelectedRole(undefined);
            }}
        >
            <div className="shadow-lg rounded-md bg-white h-full p-8">
                <Modal
                    isOpen={isOpenCreateRoleModal}
                    onClose={() => setIsOpenCreateRoleModal(false)}
                >
                    <CreateRoleForm selectedRole={selectedRole} />
                </Modal>
                <div className="w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        placeHolder={"Search..."}
                        isNotFormHook
                        variant="secondary"
                        icon="search"
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

export default Role;
