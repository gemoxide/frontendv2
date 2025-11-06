import { UpdateTask } from "./../../state/types/tasks";
import * as Yup from "yup";

export const CreateTaskScheme = Yup.object().shape({
    name: Yup.string().required("Task name is required"),
    type: Yup.string().required("Task type is required"),
    created_type: Yup.string().required("Task created type is required"),
    priority: Yup.string().required("Task priority is required"),
    due_at: Yup.string().required("Task due date is required"),
    member_id: Yup.string().required("Member is required"),
    user_id: Yup.string().required("Assigned is required"),
});

export const UpdateCompleteTaskScheme = Yup.object().shape({
    is_complete: Yup.boolean().required("Is complete is required"),
});
