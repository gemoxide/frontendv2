import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/tasks";
import { ITask } from "../../../core/interfaces/tasks.interface";
import {
    CreateTaskScheme,
    UpdateCompleteTaskScheme,
} from "../../../core/services/tasks/tasks.scheme";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../core/state/reducer/users";
import Textarea from "../../../core/components/Forms/TextArea";
import { useEffect, useMemo } from "react";
import Select from "../../../core/components/Forms/Select";
import Input from "../../../core/components/Forms/Input";
import { priorityDropdown } from "../../../core/constants/tasks-priority";
import ProfileCard from "../member/Details/components/ProfileCard";
import { getCurrentDate } from "../../../core/services/utils/utils.service";

type Props = {
    selectedTask?: ITask;
};

const CompleteTask: React.FC<Props> = ({ selectedTask }) => {
    const { updateCompleteTask, updateTask } = mapDispatchToProps();

    const { getUsers } = mapDispatchToPropsUsers();

    const { loading: updateCompleteTaskLoading } = useSelector(
        (state: RootState) => state.tasks.updateCompleteTask
    );

    const { loading: updateTaskLoading } = useSelector(
        (state: RootState) => state.tasks.updateTask
    );

    const { loading: getUsersLoading, data: getUsersData } = useSelector(
        (state: RootState) => state.users.getUsers
    );

    const formik = useFormik({
        initialValues: {
            id: selectedTask?.id || "",
            name: selectedTask?.attributes?.name || "",
            type: selectedTask?.attributes?.type || "",
            created_type: selectedTask?.attributes?.created_type || "",
            description: selectedTask?.attributes?.description || "",
            notes: selectedTask?.attributes?.notes || "",
            priority: selectedTask?.attributes?.priority || "",
            due_at: selectedTask?.attributes?.due_at || "",
            member_id: selectedTask?.relationships?.member?.id || "",
            user_id: selectedTask?.relationships?.user?.id || "",
        },
        validationSchema: CreateTaskScheme,
        onSubmit: async (values) => {
            updateTask(values);
        },
    });

    const formikUpdate = useFormik({
        initialValues: {
            id: selectedTask?.id,
            is_complete: true,
            time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        validationSchema: UpdateCompleteTaskScheme,
        onSubmit: async (values) => {
            updateCompleteTask(values);
        },
    });

    useEffect(() => {
        getUsers({ per_page: 100, page: 1 });
    }, []);

    const loading = updateCompleteTaskLoading;

    const assignedToOptions = useMemo(() => {
        return getUsersData?.data?.map((user) => {
            return {
                label: `${user?.attributes?.first_name} ${user?.attributes?.last_name}`,
                value: user?.id,
            };
        });
    }, [getUsersLoading]);

    return (
        <div className="w-full md:w-[64rem] h-full flex items-center justify-center ">
            <FormikProvider value={formik}>
                <Form className="space-y-12 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedTask?.attributes.name}
                    </h1>
                    <div className="flex w-full">
                        {selectedTask && (
                            <div className="bg-white shadow-md rounded-md p-6 w-1/2 h-full mr-4">
                                <ProfileCard
                                    id={selectedTask?.relationships?.member?.id}
                                    member={selectedTask?.relationships?.member}
                                    avatar={
                                        selectedTask?.relationships?.member
                                            ?.attributes?.avatar
                                    }
                                    leadSource={
                                        selectedTask?.relationships?.member
                                            ?.attributes
                                            ?.lead_source_formatted || ""
                                    }
                                    isEdit={false}
                                />
                            </div>
                        )}

                        <div className="w-1/2 ">
                            <Select
                                label="Assigned to"
                                name="user_id"
                                placeHolder="Select user"
                                variant="default"
                                options={assignedToOptions}
                            />
                            <Select
                                label="Priority"
                                name="priority"
                                placeHolder="Select priority"
                                variant="default"
                                options={priorityDropdown}
                            />
                            <Input
                                label="Due date"
                                name="due_at"
                                type="date"
                                placeHolder="Due date"
                                autoComplete
                                variant="default"
                                min={getCurrentDate()}
                            />
                            <Textarea
                                label="Notes"
                                name="notes"
                                placeHolder="Add notes here"
                                autoComplete
                                variant="default"
                                inputClassName="h-96"
                            />
                            <div className="py-4">
                                <div className="flex flex-row gap-x-5">
                                    <Button
                                        variant="primary"
                                        label="Save"
                                        isSubmitting={loading}
                                        className="btn-md border-2 bg-white flex-grow"
                                        onClick={() => {
                                            formik.submitForm();
                                        }}
                                    />

                                    <Button
                                        variant="primary"
                                        label={
                                            selectedTask?.attributes
                                                ?.completed_at
                                                ? "Task already completed"
                                                : "Mark as complete"
                                        }
                                        isSubmitting={loading}
                                        className={"btn-md flex-grow"}
                                        onClick={
                                            !selectedTask?.attributes
                                                ?.completed_at
                                                ? formikUpdate?.submitForm
                                                : () => null
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CompleteTask;
