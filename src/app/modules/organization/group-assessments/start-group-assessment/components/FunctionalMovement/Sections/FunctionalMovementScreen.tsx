import debounce from "lodash/debounce";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../../core/interfaces/group-assessments.interface";
import Input from "../../../../../../../core/components/Forms/Input";
import { preventNegative } from "../../../../../../../core/helpers/preventNegative";
import { preventDecimal } from "../../../../../../../core/helpers/preventDecimal";
import Select from "../../../../../../../core/components/Forms/Select";
import {
    fmsScoreDropdown,
    fmsScoreTooltip,
} from "../../../../../../../core/constants/fms-score";

interface Props {
    member: IGroupAssessmentMember;
    updateAssessment: (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => void;
}

const FunctionalMovementScreen: React.FC<Props> = ({
    member,
    updateAssessment,
}) => {
    const handleUpdateAssessment = (name: string, value: number | string) => {
        updateAssessment({ [name]: value });
    };

    return (
        <div className="col-span-2 border border-solid border-grey p-3 rounded-[10px]">
            <span>Functional Movement Screen</span>
            <div className="grid grid-cols-4 gap-3">
                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="Chair Stand: # in 30 sec"
                        subtitle="Have subject squat to sit AMTAP"
                        type="number"
                        name="chair_stand"
                        variant="primary"
                        defaultValue={member.attributes.chair_stand}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "chair_stand",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        onKeyDown={(e) => {
                            preventNegative(e);
                            preventDecimal(e);
                        }}
                        min="0"
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Reps</span>
                </div>
                <div>
                    <Select
                        name="chair_stand_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.chair_stand_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "chair_stand_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="chair_stand_notes"
                        variant="primary"
                        defaultValue={member.attributes.chair_stand_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "chair_stand_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>

                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="Seated Arm Curls: # in 30 seconds"
                        subtitle="Men 8lbs DB. Women 5lbs DB."
                        type="number"
                        name="seated_arm_curls"
                        variant="primary"
                        defaultValue={member.attributes.seated_arm_curls}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "seated_arm_curls",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        onKeyDown={(e) => {
                            preventNegative(e);
                            preventDecimal(e);
                        }}
                        min="0"
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Reps</span>
                </div>
                <div>
                    <Select
                        name="seated_arm_curls_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.seated_arm_curls_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "seated_arm_curls_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="seated_arm_curls_notes"
                        variant="primary"
                        defaultValue={member.attributes.seated_arm_curls_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "seated_arm_curls_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>

                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="Chair Sit & reach: nearest 1/2” + or -"
                        subtitle="Distance between toes and fingers"
                        type="number"
                        name="chair_sit_reach"
                        variant="primary"
                        defaultValue={member.attributes.chair_sit_reach}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "chair_sit_reach",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Distance</span>
                </div>
                <div>
                    <Select
                        name="chair_sit_reach_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.chair_sit_reach_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "chair_sit_reach_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="seated_arm_curls_notes"
                        variant="primary"
                        defaultValue={member.attributes.chair_sit_reach_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "chair_sit_reach_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>

                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="Back Scratch: nearest 1/2” + or -"
                        subtitle="How close hands get behind back"
                        type="number"
                        name="back_scratch"
                        variant="primary"
                        defaultValue={member.attributes.back_scratch}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "back_scratch",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Distance</span>
                </div>
                <div>
                    <Select
                        name="back_scratch_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.back_scratch_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "back_scratch_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="back_scratch_notes"
                        variant="primary"
                        defaultValue={member.attributes.back_scratch_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "back_scratch_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>

                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="8' Up & Go: nearest 1/10 sec"
                        subtitle="Walk 8' around cone & sit"
                        type="number"
                        name="eight_up_go"
                        variant="primary"
                        defaultValue={member.attributes.eight_up_go}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "eight_up_go",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        onKeyDown={preventNegative}
                        min="0"
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Seconds</span>
                </div>
                <div>
                    <Select
                        name="eight_up_go_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.eight_up_go_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "eight_up_go_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="eight_up_go_notes"
                        variant="primary"
                        defaultValue={member.attributes.eight_up_go_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "eight_up_go_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>

                <div className="flex gap-x-3 justify-space-between col-span-2">
                    <Input
                        className="w-fill-available"
                        label="2 Min Step Test: # of steps"
                        subtitle="Count how many times can hte subject raise their right knee Total to the length between the patella and top of the hip bone. (mark it on the mirror with a marker.) Count how many times the right knee passes the line."
                        type="number"
                        name="two_min_step_test"
                        variant="primary"
                        defaultValue={member.attributes.two_min_step_test}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "two_min_step_test",
                                    parseFloat(e.target.value)
                                );
                            },
                            500
                        )}
                        onKeyDown={(e) => {
                            preventNegative(e);
                            preventDecimal(e);
                        }}
                        min="0"
                        isNotFormHook
                    />
                    <span className="font-bold w-[100px] mt-10">Reps</span>
                </div>
                <div>
                    <Select
                        name="two_min_step_test_score"
                        label="Score"
                        className="!space-y-2"
                        options={fmsScoreDropdown}
                        placeHolder="Select Score"
                        tooltip={fmsScoreTooltip}
                        defaultValue={member.attributes.two_min_step_test_score}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value);
                                handleUpdateAssessment(
                                    "two_min_step_test_score",
                                    value
                                );
                            },
                            500
                        )}
                        autoComplete
                        isNotFormHook
                    />
                </div>
                <div>
                    <Input
                        label="Notes"
                        inputClassName="h-10"
                        name="two_min_step_test_notes"
                        variant="primary"
                        defaultValue={member.attributes.two_min_step_test_notes}
                        onChange={debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleUpdateAssessment(
                                    "two_min_step_test_notes",
                                    e.target.value
                                );
                            },
                            500
                        )}
                        isNotFormHook
                    />
                </div>
            </div>
        </div>
    );
};

export default FunctionalMovementScreen;
