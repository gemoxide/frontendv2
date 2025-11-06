import { useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { CreateRoleSchema } from "../../../../core/services/roles/role.schema";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { mapDispatchToProps } from "../../../../core/state/reducer/admin-roles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import Select from "../../../../core/components/Forms/Select";
import { IRole } from "../../../../core/interfaces/roles.interface";
import { mapDispatchToProps as mapDispatchToPropsPermissions } from "../../../../core/state/reducer/admin-permissions";
import { IPermissions } from "../../../../core/interfaces/permissions.interface";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PermissionRow from "./PermissionRow";

type Props = {
    selectedRole?: IRole;
};
const CreateRoleForm: React.FC<Props> = ({ selectedRole }) => {
    const [permissions, setPermissions] = useState<IPermissions[]>([]);
    const { createAdminRole, updateAdminRole } = mapDispatchToProps();
    const { getAdminPermissionsByType, sortAdminPermissions } =
        mapDispatchToPropsPermissions();

    const { loading: createAdminRoleLoading } = useSelector(
        (state: RootState) => state.adminRoles.createAdminRole
    );

    const { loading: updateAdminRoleLoading } = useSelector(
        (state: RootState) => state.adminRoles.updateAdminRole
    );
    const {
        loading: getAdminPermissionsByTypeLoading,
        success: getAdminPermissionsByTypeSuccess,
        data: getAdminPermissionsByTypeData,
    } = useSelector(
        (state: RootState) => state.adminPermissions.getAdminPermissionsByType
    );

    const loading =
        createAdminRoleLoading ||
        updateAdminRoleLoading ||
        getAdminPermissionsByTypeLoading;

    const formik = useFormik({
        initialValues: {
            name: selectedRole?.attributes?.name || "",
            type: selectedRole?.attributes?.type || "",
            id: selectedRole?.id || "",
            permissions:
                selectedRole?.relationships?.permissions?.map((permission) => {
                    return permission?.id;
                }) || [],
        },
        validationSchema: CreateRoleSchema,
        onSubmit: async (values) => {
            if (values?.id) updateAdminRole(values);
            else createAdminRole(values);
        },
    });

    useEffect(() => {
        if (formik?.values?.type) {
            getAdminPermissionsByType({
                per_page: 100,
                type: formik?.values?.type,
            });
        }
    }, [formik?.values?.type]);

    const handleOnChange = (id: number) => {
        const array = formik?.values?.permissions || [];
        if (array.includes(id)) {
            const index = array.indexOf(id);
            if (index > -1) array.splice(index, 1);
        } else array.push(id);
        formik.setFieldValue("permissions", array);
    };

    const reorder = (
        list: IPermissions[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const permissionsData = reorder(
            permissions,
            result.source.index,
            result.destination.index
        );

        setPermissions(permissionsData);

        await sortAdminPermissions({
            type: formik?.values?.type,
            body: {
                ids: permissionsData.map((permission) => {
                    return permission.id;
                }),
            },
        });
    };

    useEffect(() => {
        if (
            !getAdminPermissionsByTypeLoading &&
            getAdminPermissionsByTypeSuccess
        ) {
            setPermissions(getAdminPermissionsByTypeData?.data || []);
        }
    }, [getAdminPermissionsByTypeLoading, getAdminPermissionsByTypeSuccess]);

    const getItemStyle = (draggableStyle: any, isDragging: boolean) => ({
        ...draggableStyle,
        userSelect: "none",
        top: isDragging && "auto !important",
        left: isDragging && "auto !important",
    });

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center relative">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedRole?.id ? "Update Role" : "Create Role"}{" "}
                    </h1>
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeHolder="Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        label="Type"
                        name="type"
                        placeHolder="Select a type"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        options={[
                            {
                                value: "user",
                                label: "User",
                            },
                            {
                                value: "admin",
                                label: "Admin",
                            },
                        ]}
                    />
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {permissions?.map(
                                        (permission, index: number) => (
                                            <Draggable
                                                key={permission.id}
                                                draggableId={permission.id.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            provided
                                                                .draggableProps
                                                                .style,
                                                            snapshot.isDragging
                                                        )}
                                                        className="grid grid-cols-12 mt-2 mb-2 py-1 gap-x-1"
                                                    >
                                                        <PermissionRow
                                                            permission={
                                                                permission
                                                            }
                                                            index={index}
                                                            isChecked={formik?.values?.permissions.includes(
                                                                permission?.id
                                                            )}
                                                            handleOnChange={
                                                                handleOnChange
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateRoleForm;
