import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/tasks";
import { ITask } from "../../../core/interfaces/tasks.interface";
import { CreateTaskScheme } from "../../../core/services/tasks/tasks.scheme";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../core/state/reducer/users";
import { mapDispatchToProps as mapDispatchToPropsMembers } from "../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToPropGyms } from "../../../core/state/reducer/gyms";
import Textarea from "../../../core/components/Forms/TextArea";
import { useEffect, useMemo } from "react";
import Select from "../../../core/components/Forms/Select";
import { priorityDropdown } from "../../../core/constants/tasks-priority";
import { typeDropdown } from "../../../core/constants/tasks-type";
import { getCurrentDate } from "../../../core/services/utils/utils.service";
import { IMember } from "../../../core/interfaces/members.interface";

type Props = {
    selectedTask?: ITask;
    memberId?: string;
    gymMembers?: IMember[];
    gymMembersLoading?: boolean;
};

const CreateTask: React.FC<Props> = ({
    selectedTask,
    memberId,
    gymMembers,
    gymMembersLoading,
}) => {
    const { createTask, updateTask } = mapDispatchToProps();
    const { getGym } = mapDispatchToPropGyms();

    const { getUsers } = mapDispatchToPropsUsers();
    const { getMembers } = mapDispatchToPropsMembers();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { data: getGymData, loading: getGymLoading } = useSelector(
        (state: RootState) => state.gyms.getGym
    );

    const { loading: createTaskLoading } = useSelector(
        (state: RootState) => state.tasks.createTask
    );

    const { loading: updateTaskLoading } = useSelector(
        (state: RootState) => state.tasks.updateTask
    );

    const { loading: getUsersLoading, data: getUsersData } = useSelector(
        (state: RootState) => state.users.getUsers
    );

    const { loading: getMembersLoading, data: getMembersData } = useSelector(
        (state: RootState) => state.members.getMembers
    );

    useEffect(() => {
        getUsers({ per_page: 100, page: 1 });
        getMembers({ per_page: 100, page: 1, member_type: "all" });
    }, []);

    useEffect(() => {
        if (currentUser?.relationships?.user_gyms?.length) {
            getGym(currentUser?.relationships?.user_gyms[0]?.id);
        }
    }, [currentUser]);

    const formik = useFormik({
        initialValues: {
            id: selectedTask?.id || "",
            name: selectedTask?.attributes?.name || "",
            type: selectedTask?.attributes?.type || "",
            created_type: selectedTask?.attributes?.created_type || "manual",
            description: selectedTask?.attributes?.description || "",
            notes: selectedTask?.attributes?.notes || "",
            priority: selectedTask?.attributes?.priority || "",
            due_at: selectedTask?.attributes?.due_at || "",
            member_id:
                selectedTask?.relationships?.member?.id || memberId || "",
            user_id: selectedTask?.relationships?.user?.id || "",
        },
        validationSchema: CreateTaskScheme,
        onSubmit: async (values) => {
            if (values?.id) updateTask(values);
            else createTask(values);
        },
    });

    const loading = createTaskLoading || updateTaskLoading;

    const assignedToOptions = useMemo(() => {
        return getUsersData?.data?.map((user) => {
            return {
                label: `${user?.attributes?.first_name} ${user?.attributes?.last_name}`,
                value: user?.id,
            };
        });
    }, [getUsersLoading]);

    const membersOptions = useMemo(() => {
        return (
            gymMembers?.map((member) => ({
                label: `${member?.attributes?.first_name} ${member?.attributes?.last_name}`,
                value: member?.id,
            })) || []
        );
    }, [gymMembers]);

    const changeDefaultAssigned = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "New Client Onboarding":
                //set default_client_onboarding_id from current user to user_id in formik
                formik.setFieldValue(
                    "user_id",
                    getGymData?.attributes?.default_client_onboarding_id
                );
                break;
            case "Assessment":
                formik.setFieldValue(
                    "user_id",
                    getGymData?.attributes?.default_assessment_id
                );
                break;
            case "Lead":
                formik.setFieldValue(
                    "user_id",
                    getGymData?.attributes?.default_lead_id
                );
                break;
            case "Office Staff":
                formik.setFieldValue(
                    "user_id",
                    getGymData?.attributes?.default_office_staff_id
                );
                break;
            default:
                formik.setFieldValue("user_id", "");
                break;
        }
    };

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedTask?.id ? "Update Task" : "Create Task"}
                    </h1>
                    <Input
                        label="Task"
                        name="name"
                        type="text"
                        placeHolder="Task name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Description"
                        name="description"
                        type="text"
                        placeHolder="Task description"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        label="Type"
                        name="type"
                        placeHolder="Select type"
                        disabled={loading}
                        variant="default"
                        options={typeDropdown}
                        onChange={changeDefaultAssigned}
                    />
                    <Input
                        label="Due date"
                        name="due_at"
                        type="date"
                        placeHolder="Due date"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        min={getCurrentDate()}
                    />
                    <Select
                        label="Member"
                        name="member_id"
                        placeHolder="Select member"
                        disabled={gymMembersLoading || loading}
                        variant="default"
                        options={membersOptions}
                    />
                    <Select
                        label="Assigned to"
                        name="user_id"
                        placeHolder="Select user"
                        disabled={getUsersLoading || loading}
                        variant="default"
                        options={assignedToOptions}
                    />
                    <Select
                        label="Priority"
                        name="priority"
                        placeHolder="Select priority"
                        disabled={loading}
                        variant="default"
                        options={priorityDropdown}
                    />
                    <Textarea
                        label="Notes"
                        name="notes"
                        placeHolder="Add notes here"
                        autoComplete
                        disabled={loading}
                        variant="default"
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

export default CreateTask;
