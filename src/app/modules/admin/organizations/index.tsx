import { useState } from "react";
import Section from "../../../core/components/Section";
import Input from "../../../core/components/Forms/Input";
import CustomDataTable from "../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-organizations";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Modal from "../../../core/components/Modal";
import CreateOrganizationsForm from "./CreateOrganizationForm";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { IOrganization } from "../../../core/interfaces/organizations.interface";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes";
import { confirmDelete } from "../../../core/helpers/prompt";

const Organizations = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isOpenCreateOrganizationsModal, setIsOpenCreateOrganizationsModal] =
        useState(false);
    const [selectedOrganizations, setSelectedOrganizations] = useState<any>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const { data, loading } = useSelector(
        (state: RootState) => state.adminOrganizations.getAdminOrganizations
    );

    const { getAdminOrganizations, deleteAdminOrganization } =
        mapDispatchToProps();

    const {
        loading: createAdminOrganizationsLoading,
        success: createAdminOrganizationsSuccess,
    } = useSelector(
        (state: RootState) => state.adminOrganizations.createAdminOrganization
    );

    const {
        loading: deleteAdminOrganizationLoading,
        success: deleteAdminOrganizationSuccess,
    } = useSelector(
        (state: RootState) => state.adminOrganizations.deleteAdminOrganization
    );

    const {
        loading: updateAdminOrganizationLoading,
        success: updateAdminOrganizationSuccess,
    } = useSelector(
        (state: RootState) => state.adminOrganizations.updateAdminOrganization
    );

    const columns: TableColumn<IOrganization>[] = [
        {
            name: "Name",
            cell: (organization) => (
                <span>{`${organization?.attributes?.name}`}</span>
            ),
            sortable: true,
            sortField: "name",
        },

        {
            name: "Tagline",
            sortable: true,
            sortField: "tagline",
            cell: (organization) => organization.attributes?.tagline,
        },

        {
            name: "",
            width: "15%",
            sortable: false,
            cell: (organization: any) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            {
                                label: "Manage",
                                action: () => {
                                    navigate(
                                        ROUTES.ADMIN.organization.parse(
                                            organization.id
                                        )
                                    );
                                },
                            },
                            {
                                label: "Edit",
                                action: () => {
                                    setSelectedOrganizations(organization);
                                    setIsOpenCreateOrganizationsModal(true);
                                },
                            },

                            {
                                label: "Delete",
                                action: async () => {
                                    const { isConfirmed } = await confirmDelete(
                                        "Organization"
                                    );
                                    if (isConfirmed) {
                                        deleteAdminOrganization(
                                            organization?.id
                                        );
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
        getAdminOrganizations({
            page,
            search,
            per_page: perPage,
            order_by: orderBy,
            direction: sortDirection,
        });
    };

    useEffect(() => {
        const getAdminOrganizations = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getAdminOrganizations);
    }, [page, perPage, orderBy, sortDirection, search]);

    useEffect(() => {
        if (
            !createAdminOrganizationsLoading &&
            createAdminOrganizationsSuccess
        ) {
            setIsOpenCreateOrganizationsModal(false);
            fetch();
        }
    }, [createAdminOrganizationsLoading]);

    useEffect(() => {
        if (!deleteAdminOrganizationLoading && deleteAdminOrganizationSuccess) {
            fetch();
        }
    }, [deleteAdminOrganizationLoading]);

    useEffect(() => {
        if (!updateAdminOrganizationLoading && updateAdminOrganizationSuccess) {
            fetch();
            setIsOpenCreateOrganizationsModal(false);
            setSelectedOrganizations(undefined);
        }
    }, [updateAdminOrganizationLoading]);

    const handleSort = async (column: any, sortDirection: string) => {
        if (column?.sortField) setOrderBy(column?.sortField?.toLowerCase());
        if (sortDirection) setSortDirection(sortDirection);
    };

    return (
        <Section
            title="Organizations"
            rightButtonLabel="Add Organization"
            rightButtonOnclick={() => {
                setSelectedOrganizations(undefined);
                setIsOpenCreateOrganizationsModal(true);
            }}
        >
            <div className="shadow-lg rounded-md bg-white h-full p-8">
                <Modal
                    isOpen={isOpenCreateOrganizationsModal}
                    onClose={() => setIsOpenCreateOrganizationsModal(false)}
                >
                    <CreateOrganizationsForm
                        selectedOrganization={selectedOrganizations}
                    />
                </Modal>
                <div className="w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        isNotFormHook
                        placeHolder={"Search..."}
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

export default Organizations;
