import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/groups";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../../../core/state/reducer/users";
import { mapDispatchToProps as mapDispatchToPropsGyms } from "../../../../../core/state/reducer/gyms";
import { IGroup } from "../../../../../core/interfaces/groups.interface";
import MultiSelect from "../../../../../core/components/Forms/MultiSelect";
import { useEffect, useMemo } from "react";
import { CreateGroupScheme } from "../../../../../core/services/groups/groups.scheme";

type Props = {
    selectedGroup?: IGroup;
};

const CreateGroupForm: React.FC<Props> = ({ selectedGroup }) => {
    const { createGroup, updateGroup } = mapDispatchToProps();
    const { getUsers } = mapDispatchToPropsUsers();
    const { getGyms } = mapDispatchToPropsGyms();

    const { loading: getUsersLoading, data: getUsersData } = useSelector(
        (state: RootState) => state.users.getUsers
    );

    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { loading: createGroupLoading } = useSelector(
        (state: RootState) => state.groups.createGroup
    );

    const { loading: updateGroupLoading } = useSelector(
        (state: RootState) => state.groups.updateGroup
    );

    const formik = useFormik({
        initialValues: {
            id: selectedGroup?.id || "",
            name: selectedGroup?.attributes?.name || "",
            user_ids:
                selectedGroup?.relationships?.users?.map((user) => {
                    return {
                        label: `${user.attributes?.first_name}${user.attributes?.last_name}`,
                        value: user.id,
                    };
                }) || [],
            gym_ids:
                selectedGroup?.relationships?.gyms?.map((gym) => {
                    return {
                        label: gym.attributes.name,
                        value: gym.id,
                    };
                }) || [],
        },
        validationSchema: CreateGroupScheme,
        onSubmit: async (values) => {
            const user_ids = values?.user_ids?.map((val: any) => {
                return val?.value;
            });
            const gym_ids = values?.gym_ids?.map((val: any) => {
                return val?.value;
            });
            const body = {
                id: selectedGroup?.id,
                name: values?.name,
                user_ids,
                gym_ids,
            };
            if (selectedGroup?.id) updateGroup(body);
            else createGroup(body);
        },
    });

    useEffect(() => {
        getUsers({ per_page: 100, page: 1 });
        getGyms({ per_page: 100, page: 1 });
    }, []);

    const loading = createGroupLoading || updateGroupLoading;

    const usersOptions = useMemo(() => {
        return getUsersData?.data?.map((user) => {
            return {
                label: `${user?.attributes?.first_name}${user?.attributes?.last_name}`,
                value: user?.id,
            };
        });
    }, [getUsersLoading]);

    const gymsOptions = useMemo(() => {
        return getGymsData?.data?.map((gym) => {
            return {
                label: gym?.attributes.name,
                value: gym.id,
            };
        });
    }, [getGymsLoading]);

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedGroup?.id ? "Update Group" : "Create Group"}
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
                    <MultiSelect
                        label="Select Users"
                        name="user_ids"
                        options={usersOptions}
                        disabled={loading}
                        loading={getUsersLoading}
                    />
                    <MultiSelect
                        label="Select Location"
                        name="gym_ids"
                        options={gymsOptions}
                        disabled={loading}
                        loading={getGymsLoading}
                    />
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

export default CreateGroupForm;
