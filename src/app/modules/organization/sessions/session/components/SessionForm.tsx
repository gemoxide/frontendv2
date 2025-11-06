import { useEffect, useMemo } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import {
    ISession,
    ISessionMember,
} from "../../../../../core/interfaces/sessions.interface";
import { CreateSessionSchema } from "../../../../../core/services/sessions/session.schema";
import { mapDispatchToProps } from "../../../../../core/state/reducer/sessions";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../../../core/state/reducer/users";
import { RootState } from "../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Select from "../../../../../core/components/Forms/Select";
import Input from "../../../../../core/components/Forms/Input";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import Button from "../../../../../core/components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../../core/constants/routes";
import { toast } from "react-toastify";
import { customFormatDateUseBrowserTZ } from "../../../../../core/services/utils/utils.service";
import moment from "moment";

interface Props {
    selectedSession?: ISession;
    selectedMembers: ISessionMember[];
    removeMember: (id: string) => void;
    clearMembers: () => void;
}

const SessionForm: React.FC<Props> = ({
    selectedSession,
    selectedMembers,
    removeMember,
    clearMembers,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { createSession, updateSession, resetCreateSessionState } =
        mapDispatchToProps();
    const { getGymUsers } = mapDispatchToUserProps();

    const {
        data: currentUser,
        success: currentUserSuccess,
        loading: currentUserLoading,
    } = useSelector((state: RootState) => state.auth.user);

    const {
        data: gymUsers,
        loading: gymUsersLoading,
        success: gymUsersSuccess,
    } = useSelector((state: RootState) => state.users.getGymUsers);

    const {
        data: createSessionData,
        loading: createSessionLoading,
        success: createSessionSuccess,
    } = useSelector((state: RootState) => state.sessions.createSession);

    const { loading: updateSessionLoading, success: updateSessionSuccess } =
        useSelector((state: RootState) => state.sessions.updateSession);

    useEffect(() => {
        if (
            !currentUserLoading &&
            currentUserSuccess &&
            currentUser?.relationships.user_gyms?.length
        ) {
            getGymUsers({
                gym_id: currentUser?.relationships?.user_gyms[0].id,
            });
        }
    }, [currentUserLoading, currentUserSuccess]);

    useEffect(() => {
        if (!id) {
            clearMembers();
            formik.resetForm();
        }
    }, [id, selectedSession]);

    useEffect(() => {
        if (
            createSessionSuccess &&
            !createSessionLoading &&
            createSessionData &&
            !id
        ) {
            navigate(
                ROUTES.USER.sessionEdit.parse(createSessionData?.id.toString())
            );
            resetCreateSessionState();
        }
    }, [createSessionLoading, createSessionSuccess]);

    useEffect(() => {
        if (updateSessionSuccess && !updateSessionLoading)
            toast.success("Session saved successfully");
    }, [updateSessionLoading, updateSessionSuccess]);

    const formik = useFormik({
        initialValues: {
            id: selectedSession?.id || undefined,
            user_id: selectedSession?.relationships?.user?.id || 0,
            session_at: selectedSession
                ? customFormatDateUseBrowserTZ(
                      selectedSession?.attributes?.session_at,
                      "date_time",
                      "YYYY-MM-DD HH:mm:ss"
                  )
                : "",
            member_ids:
                selectedSession?.relationships.members?.map(
                    (member) => member.id
                ) || [],
        },
        validationSchema: CreateSessionSchema,
        onSubmit: async (values, { resetForm }) => {
            if (selectedSession?.id)
                updateSession({
                    ...values,
                });
            else {
                createSession({
                    ...values,
                });
            }
        },
    });

    const coachOptions = useMemo(() => {
        return gymUsers?.data.map((user) => {
            return {
                label: `${user?.attributes.first_name} ${user?.attributes.last_name}`,
                value: user.id,
            };
        });
    }, [gymUsers]);

    useEffect(() => {
        if (!!selectedSession && id && gymUsersSuccess && !gymUsersLoading) {
            formik.setValues({
                ...formik.values,
                id: selectedSession.id,
                session_at: customFormatDateUseBrowserTZ(
                    selectedSession?.attributes?.session_at,
                    "date_time",
                    "YYYY-MM-DD HH:mm:ss"
                ),
                user_id: selectedSession?.relationships?.user?.id || 0,
                member_ids: selectedMembers.map((member) => member.id),
            });
        }
    }, [selectedSession, gymUsersSuccess, gymUsersLoading]);

    useEffect(() => {
        formik.setFieldValue(
            "member_ids",
            selectedMembers.map((member) => member.id)
        );
    }, [selectedMembers]);

    const loading = createSessionLoading || updateSessionLoading;

    return (
        <div className="w-4/12">
            <FormikProvider value={formik}>
                <Form className="flex flex-col gap-y-3">
                    <div className="w-full bg-white shadow-lg p-3 rounded-lg flex flex-col gap-y-2">
                        <Select
                            name="user_id"
                            label="Assigned To"
                            placeHolder="Select Coach"
                            autoComplete
                            options={coachOptions}
                            variant="default"
                            disabled={gymUsersLoading}
                        />
                        <Input
                            name="session_at"
                            label="Date"
                            type="datetime-local"
                            variant="default"
                        />
                    </div>
                    <div className="w-full bg-white shadow-lg p-3 rounded-lg flex flex-col">
                        <label className="text-sm text-secondary font-bold border-b pb-2">
                            Members
                        </label>
                        <ul>
                            {selectedMembers.map((member) => {
                                return (
                                    <li
                                        className="flex justify-between border-b py-2"
                                        key={member.id}
                                    >
                                        <span>
                                            {member.attributes.first_name}{" "}
                                            {member.attributes.last_name}
                                        </span>
                                        <UserMinusIcon
                                            width={20}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                removeMember(member.id)
                                            }
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md mt-5"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default SessionForm;
