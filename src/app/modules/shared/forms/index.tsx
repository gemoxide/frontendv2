import { TableColumn } from "react-data-table-component";
import Section from "../../../core/components/Section";
import { IForm } from "../../../core/interfaces/forms.interface";
import { mapDispatchToProps } from "../../../core/state/reducer/forms";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "../../../core/state/reducer";
import { useSelector } from "react-redux";
import CustomDataTable from "../../../core/components/DataTable";
import Input from "../../../core/components/Forms/Input";
import ToggleSwitch from "../../../core/components/Forms/ToggleSwitch";
import KebabDropdown from "../../../core/components/KebabDropdown";
import { confirmDelete } from "../../../core/helpers/prompt";
import CreateForm from "./CreateForm";
import Modal from "../../../core/components/Modal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes";
import { PermissionType } from "../../../core/interfaces/routes.interface";

const Forms: React.FC = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [selectedForm, setSelectedForm] = useState<any>();
    const [isOpenCreateFormModal, setIsOpenCreateFormModal] = useState(false);
    const {
        getForms,
        deleteForm,
        updateForm,
        updateAdminFormStatus,
        cloneForm,
    } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getFormsData, loading: getFormsLoading } = useSelector(
        (state: RootState) => state.forms.getForms
    );

    const { loading: cloneFormLoading, success: cloneFormSuccess } =
        useSelector((state: RootState) => state.forms.cloneForm);

    const { loading: createFormLoading, success: createFormSuccess } =
        useSelector((state: RootState) => state.forms.createForm);

    const { loading: updateFormLoading, success: updateFormSuccess } =
        useSelector((state: RootState) => state.forms.updateForm);

    const { loading: deleteFormLoading } = useSelector(
        (state: RootState) => state.forms.deleteForm
    );

    const loading =
        cloneFormLoading ||
        getFormsLoading ||
        deleteFormLoading ||
        updateFormLoading ||
        createFormLoading;

    const fetch = async () => {
        getForms({
            page,
            per_page: perPage,
            search,
        });
    };

    useEffect(() => {
        const getForms = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getForms);
    }, [page, perPage, search]);

    useEffect(() => {
        if (!createFormLoading && createFormSuccess) {
            setIsOpenCreateFormModal(false);
        }
    }, [createFormLoading, createFormSuccess]);

    useEffect(() => {
        if (!updateFormLoading && updateFormSuccess) {
            setIsOpenCreateFormModal(false);
        }
    }, [updateFormLoading, updateFormSuccess]);

    const navigate = useNavigate();

    const isToggleForm = (selectedForm: IForm) => {
        if (!hasUpdateForm && currentUser?.attributes?.type !== "admin") {
            return;
        }

        if (
            currentUser?.relationships?.user_gyms?.length &&
            selectedForm?.attributes?.type !== "gym"
        ) {
            return;
        }

        if (
            selectedForm?.attributes?.type === "admin" &&
            currentUser?.attributes?.type !== "admin"
        ) {
            updateAdminFormStatus({
                id: selectedForm?.id,
                is_active: !selectedForm?.attributes?.is_admin_active,
            });
        } else {
            const values = {
                id: selectedForm?.id || "",
                name: selectedForm?.attributes?.name || "",
                description: selectedForm?.attributes?.description || "",
                is_active: !selectedForm.attributes.is_active,
            };
            updateForm(values);
        }
    };

    const hasCreateForm = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.FORM_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateForm = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.FORM_UPDATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteForm = useMemo(() => {
        if (currentUser?.attributes.type === "admin") {
            return true;
        }
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.FORM_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<IForm>[] = [
        {
            name: "Name",
            width: "25%",
            cell: (form) => form?.attributes?.name,
        },
        {
            name: "Description",
            width: "40%",
            cell: (form) => (
                <div className="p-2"> {form?.attributes?.description}</div>
            ),
        },
        {
            name:
                currentUser?.attributes.type === "admin"
                    ? "Add to Global Library"
                    : "Active",
            width: "20%",
            cell: (form) => (
                <ToggleSwitch
                    isToggled={
                        form?.attributes?.type === "admin" &&
                        currentUser?.attributes.type !== "admin"
                            ? form?.attributes?.is_admin_active
                            : form?.attributes?.is_active
                    }
                    onChange={() => isToggleForm(form)}
                />
            ),
        },
        {
            name: "",
            sortable: false,
            cell: (form) => {
                if (
                    currentUser?.relationships?.user_gyms?.length &&
                    form?.attributes?.type !== "gym"
                ) {
                    return (
                        <div className="w-full flex justify-end">
                            {hasCreateForm && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        {
                                            label: "Clone Form",
                                            action: () => cloneForm(form.id),
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    );
                }
                if (
                    !currentUser?.relationships?.user_gyms?.length &&
                    currentUser?.attributes?.type !== "admin" &&
                    form?.attributes?.type !== "org"
                ) {
                    return (
                        <div className="w-full flex justify-end">
                            {hasCreateForm && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        {
                                            label: "Clone Form",
                                            action: () => cloneForm(form.id),
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    );
                }
                return (
                    <div className="w-full flex justify-end">
                        {(hasCreateForm || hasUpdateForm || hasDeleteForm) &&
                            (form?.attributes?.type !== "admin" ||
                                currentUser?.attributes.type === "admin") && (
                                <KebabDropdown
                                    placement="top"
                                    lists={[
                                        ...(hasCreateForm
                                            ? [
                                                  {
                                                      label: "Clone Form",
                                                      action: () =>
                                                          cloneForm(form.id),
                                                  },
                                              ]
                                            : []),
                                        ...(hasUpdateForm
                                            ? [
                                                  {
                                                      label: "Edit Form",
                                                      action: () => {
                                                          setSelectedForm(form);
                                                          setIsOpenCreateFormModal(
                                                              true
                                                          );
                                                      },
                                                  },
                                                  {
                                                      label: "Manage Form",
                                                      action: () => {
                                                          navigate(
                                                              currentUser
                                                                  ?.attributes
                                                                  .type ===
                                                                  "admin"
                                                                  ? ROUTES.ADMIN.form.parse(
                                                                        form.id
                                                                    )
                                                                  : ROUTES.USER.form.parse(
                                                                        form.id
                                                                    )
                                                          );
                                                      },
                                                  },
                                              ]
                                            : []),
                                        ...(hasDeleteForm
                                            ? [
                                                  {
                                                      label: "Delete",
                                                      action: async () => {
                                                          const {
                                                              isConfirmed,
                                                          } =
                                                              await confirmDelete(
                                                                  "Form"
                                                              );
                                                          if (isConfirmed) {
                                                              deleteForm(
                                                                  form?.id
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
                );
            },
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    return (
        <Section
            title="Forms"
            {...(hasCreateForm
                ? {
                      rightButtonLabel: "Create Form",
                      rightButtonOnclick: () => {
                          setSelectedForm(undefined);
                          setIsOpenCreateFormModal(true);
                      },
                  }
                : {})}
        >
            <Modal
                isOpen={isOpenCreateFormModal}
                onClose={() => setIsOpenCreateFormModal(false)}
            >
                <CreateForm selectedForm={selectedForm} />
            </Modal>
            <div className="w-full bg-white rounded-lg p-8 shadow-lg">
                <div className="w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        isNotFormHook
                        placeHolder={"Search by name and description"}
                        variant="secondary"
                        icon="search"
                    />
                </div>
                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={getFormsData?.data || []}
                        pagination
                        paginationServer
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationTotalRows={getFormsData?.meta?.total}
                        sortServer
                    />
                </div>
            </div>
        </Section>
    );
};

export default Forms;
