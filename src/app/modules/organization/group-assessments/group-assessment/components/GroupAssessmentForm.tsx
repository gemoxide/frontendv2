import React, { useEffect, useMemo } from "react";
import { RootState } from "../../../../../core/state/reducer";
import { Form, FormikProvider, useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { customFormatDateUseBrowserTZ } from "../../../../../core/services/utils/utils.service";
import { mapDispatchToProps } from "../../../../../core/state/reducer/group-assessments";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../../../core/state/reducer/users";
import { mapDispatchToProps as mapDispatchToPresentationDeckProps } from "../../../../../core/state/reducer/presentation-decks";
import { mapDispatchToProps as mapDispatchToAssessmentsProps } from "../../../../../core/state/reducer/assessments";
import {
    IGroupAssessment,
    IGroupAssessmentMember,
} from "../../../../../core/interfaces/group-assessments.interface";
import Select from "../../../../../core/components/Forms/Select";
import Input from "../../../../../core/components/Forms/Input";
import Button from "../../../../../core/components/Button";
import { CreateGroupAssessmentSchema } from "../../../../../core/services/group-assessments/group-assessment.schema";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "../../../../../core/constants/routes";

interface Props {
    selectedGroupAssessment?: IGroupAssessment;
    selectedMembers: IGroupAssessmentMember[];
    removeMember: (id: string) => void;
    clearMembers: () => void;
    type: "Standard" | "Optimal Life";
}

const GroupAssessmentForm: React.FC<Props> = ({
    selectedGroupAssessment,
    selectedMembers,
    removeMember,
    clearMembers,
    type,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        createGroupAssessment,
        updateGroupAssessment,
        resetCreateGroupAssessmentState,
    } = mapDispatchToProps();

    const { getPresentationDecks } = mapDispatchToPresentationDeckProps();
    const { getGymUsers } = mapDispatchToUserProps();
    const { getAssessments } = mapDispatchToAssessmentsProps();

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
        data: createGroupAssessmentData,
        loading: createGroupAssessmentLoading,
        success: createGroupAssessmentSuccess,
    } = useSelector(
        (state: RootState) => state.groupAssessments.createGroupAssessment
    );

    const {
        loading: updateGroupAssessmentLoading,
        success: updateGroupAssessmentSuccess,
    } = useSelector(
        (state: RootState) => state.groupAssessments.updateGroupAssessment
    );

    const {
        loading: getPresentationDecksLoading,
        success: getPresentationDecksSuccess,
        data: getPresentationDecksData,
    } = useSelector(
        (state: RootState) => state.presentationDecks.getPresentationDecks
    );

    const {
        loading: getAssessmentsLoading,
        success: getAssessmentsSuccess,
        data: getAssessmentsData,
    } = useSelector((state: RootState) => state.assessments.getAssessments);

    useEffect(() => {
        getAssessments();
    }, []);

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
        getPresentationDecks({ per_page: 100 });
    }, []);

    useEffect(() => {
        if (!id) {
            clearMembers();
            formik.resetForm();
        }
    }, [id, selectedGroupAssessment]);

    useEffect(() => {
        if (
            createGroupAssessmentSuccess &&
            !createGroupAssessmentLoading &&
            createGroupAssessmentData &&
            !id
        ) {
            navigate(
                ROUTES.USER.groupAssessmentEdit.parse(
                    createGroupAssessmentData?.id.toString()
                )
            );
            resetCreateGroupAssessmentState();
        }
    }, [createGroupAssessmentLoading, createGroupAssessmentSuccess]);

    useEffect(() => {
        if (updateGroupAssessmentSuccess && !updateGroupAssessmentLoading)
            toast.success("Assessment saved successfully");
    }, [updateGroupAssessmentLoading, updateGroupAssessmentSuccess]);

    const formik = useFormik({
        initialValues: {
            id: selectedGroupAssessment?.id || undefined,
            assessment_mode_id:
                selectedGroupAssessment?.attributes.assessment_mode_id || "1",
            assessment_type_id:
                selectedGroupAssessment?.attributes.assessment_type_id || "",
            user_id: selectedGroupAssessment?.relationships?.user?.id || 0,
            pre_assessment_deck_id:
                selectedGroupAssessment?.relationships?.pre_assessment_deck
                    ?.id ||
                selectedGroupAssessment?.attributes
                    ?.pre_assessment_custom_deck ||
                null,
            training_focus_deck_id:
                selectedGroupAssessment?.relationships?.training_focus_deck
                    ?.id ||
                selectedGroupAssessment?.attributes
                    ?.training_focus_custom_deck ||
                null,
            post_assessment_deck_id:
                selectedGroupAssessment?.relationships?.post_assessment_deck
                    ?.id ||
                selectedGroupAssessment?.attributes
                    ?.post_assessment_custom_deck ||
                null,
            assessment_at: selectedGroupAssessment
                ? customFormatDateUseBrowserTZ(
                      selectedGroupAssessment?.attributes?.assessment_at,
                      "date_time",
                      "YYYY-MM-DD HH:mm:ss"
                  )
                : "",
            member_ids:
                selectedGroupAssessment?.relationships.members?.map(
                    (member) => member.id
                ) || [],
            // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        validationSchema: CreateGroupAssessmentSchema,
        onSubmit: async (values, { resetForm }) => {
            if (selectedGroupAssessment?.id)
                updateGroupAssessment({
                    ...values,
                    ...(values.pre_assessment_deck_id === "Grow"
                        ? {
                              pre_assessment_deck_id: undefined,
                              pre_assessment_custom_deck: "Grow",
                          }
                        : {
                              pre_assessment_deck_id:
                                  values.pre_assessment_deck_id,
                              pre_assessment_custom_deck: undefined,
                          }),
                    ...(values.training_focus_deck_id === "Grow"
                        ? {
                              training_focus_deck_id: undefined,
                              training_focus_custom_deck: "Grow",
                          }
                        : {
                              training_focus_deck_id:
                                  values.training_focus_deck_id,
                              training_focus_custom_deck: undefined,
                          }),
                    ...(values.post_assessment_deck_id === "Grow"
                        ? {
                              post_assessment_deck_id: undefined,
                              post_assessment_custom_deck: "Grow",
                          }
                        : {
                              post_assessment_deck_id:
                                  values.post_assessment_deck_id,
                              post_assessment_custom_deck: undefined,
                          }),
                });
            else {
                createGroupAssessment({
                    ...values,
                    ...(values.pre_assessment_deck_id === "Grow"
                        ? {
                              pre_assessment_deck_id: undefined,
                              pre_assessment_custom_deck: "Grow",
                          }
                        : {
                              pre_assessment_deck_id:
                                  values.pre_assessment_deck_id,
                              pre_assessment_custom_deck: undefined,
                          }),
                    ...(values.training_focus_deck_id === "Grow"
                        ? {
                              training_focus_deck_id: undefined,
                              training_focus_custom_deck: "Grow",
                          }
                        : {
                              training_focus_deck_id:
                                  values.training_focus_deck_id,
                              training_focus_custom_deck: undefined,
                          }),
                    ...(values.post_assessment_deck_id === "Grow"
                        ? {
                              post_assessment_deck_id: undefined,
                              post_assessment_custom_deck: "Grow",
                          }
                        : {
                              post_assessment_deck_id:
                                  values.post_assessment_deck_id,
                              post_assessment_custom_deck: undefined,
                          }),
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

    const assessmentModeOptions = useMemo(() => {
        return getAssessmentsData?.attributes?.modes.map((mode) => ({
            label: mode.name,
            value: mode.id,
        }));
    }, [getAssessmentsData]);

    const assessmentTypeOptions = useMemo(() => {
        return getAssessmentsData?.attributes.types.map((type) => ({
            label: type.name,
            value: type.id,
        }));
    }, [getAssessmentsData]);

    useEffect(() => {
        if (
            !!selectedGroupAssessment &&
            id &&
            gymUsersSuccess &&
            !gymUsersLoading &&
            getPresentationDecksSuccess &&
            !getPresentationDecksLoading
        ) {
            const dataType = getAssessmentsData?.attributes.types.find(
                (type) => type.name === selectedGroupAssessment.attributes.type
            );
            const dataMode = getAssessmentsData?.attributes.modes.find(
                (md) => md.name === selectedGroupAssessment.attributes.mode
            );

            formik.setValues({
                ...formik.values,
                id: selectedGroupAssessment.id,
                assessment_type_id: String(dataType?.id),
                assessment_mode_id: String(dataMode?.id),
                assessment_at: customFormatDateUseBrowserTZ(
                    selectedGroupAssessment?.attributes?.assessment_at,
                    "date_time",
                    "YYYY-MM-DD HH:mm:ss"
                ),
                user_id: selectedGroupAssessment?.relationships?.user?.id || 0,
                training_focus_deck_id:
                    selectedGroupAssessment?.relationships?.training_focus_deck
                        ?.id ||
                    selectedGroupAssessment?.attributes
                        ?.training_focus_custom_deck ||
                    undefined,
                pre_assessment_deck_id:
                    selectedGroupAssessment?.relationships?.pre_assessment_deck
                        ?.id ||
                    selectedGroupAssessment?.attributes
                        ?.pre_assessment_custom_deck ||
                    undefined,
                post_assessment_deck_id:
                    selectedGroupAssessment?.relationships?.post_assessment_deck
                        ?.id ||
                    selectedGroupAssessment?.attributes
                        ?.post_assessment_custom_deck ||
                    undefined,
                member_ids: selectedMembers.map((member) => member.id),
            });
        }
    }, [
        selectedGroupAssessment,
        gymUsersSuccess,
        gymUsersLoading,
        getPresentationDecksLoading,
        getPresentationDecksSuccess,
    ]);

    useEffect(() => {
        formik.setFieldValue(
            "member_ids",
            selectedMembers.map((member) => member.id)
        );
    }, [selectedMembers]);

    const presentationDecksOption = useMemo(() => {
        return [
            ...(getPresentationDecksData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []),
            {
                label: "Path to Success",
                value: "Grow",
            },
        ];
    }, [getPresentationDecksData]);

    const loading =
        createGroupAssessmentLoading || updateGroupAssessmentLoading;

    useEffect(() => {
        if (type === "Optimal Life") {
            formik.setFieldValue("assessment_mode_id", "2");
        } else {
            formik.setFieldValue("assessment_mode_id", "1");
        }
    }, [type]);

    console.log(formik.values);

    return (
        <div className="w-4/12">
            <FormikProvider value={formik}>
                <Form className="flex flex-col gap-y-3">
                    <div className="w-full bg-white shadow-lg p-3 rounded-lg flex flex-col gap-y-2">
                        <Select
                            name="assessment_mode_id"
                            label="Assessment Mode"
                            placeHolder="Select Assessment Mode"
                            options={assessmentModeOptions}
                            variant="default"
                            disabled={getAssessmentsLoading}
                        />
                        <Select
                            name="assessment_type_id"
                            label="Assessment Type"
                            placeHolder="Select Assessment Type"
                            options={assessmentTypeOptions}
                            variant="default"
                            disabled={getAssessmentsLoading}
                        />
                        <Select
                            name="user_id"
                            label="Assigned To"
                            placeHolder="Select Coach"
                            autoComplete
                            options={coachOptions}
                            variant="default"
                            disabled={gymUsersLoading}
                        />
                        <Select
                            label="Deck 1"
                            name="pre_assessment_deck_id"
                            placeHolder="Select Deck 1"
                            autoComplete
                            disabled={getPresentationDecksLoading}
                            variant="default"
                            options={presentationDecksOption}
                        />
                        <Select
                            label="Deck 2"
                            name="training_focus_deck_id"
                            placeHolder="Select Deck 2"
                            autoComplete
                            disabled={getPresentationDecksLoading}
                            variant="default"
                            options={presentationDecksOption}
                        />
                        <Select
                            label="Deck 3"
                            name="post_assessment_deck_id"
                            placeHolder="Select Deck 3"
                            autoComplete
                            disabled={getPresentationDecksLoading}
                            variant="default"
                            options={presentationDecksOption}
                        />
                        <Input
                            name="assessment_at"
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

export default GroupAssessmentForm;
