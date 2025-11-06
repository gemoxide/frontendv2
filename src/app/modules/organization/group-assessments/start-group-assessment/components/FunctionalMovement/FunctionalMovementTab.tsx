import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";
import MemberAvatar from "../../../../../../../../assets/img/default-user.png";
import Checkbox from "../../../../../../core/components/Forms/CheckBox";

interface Props {
    member: IGroupAssessmentMember;
    isCurrent: boolean;
    assessmentMode?: string;
    fmsScore?: number;
    classification?: string;
}

const FunctionalMovementTab: React.FC<Props> = ({
    member,
    isCurrent,
    assessmentMode,
    fmsScore,
    classification,
}) => {
    const calculatePerfScore = (): number => {
        if (assessmentMode === "Optimal Life") {
            return 40 * Math.floor(member?.attributes?.sets_completed || 0);
        }
        const value =
            60 * Math.floor(member?.attributes?.sets_completed || 0) +
            (member?.attributes?.completed_reps || 0);
        return value;
    };
    return (
        <div
            className={`rounded-[10px] py-3 px-4 ${
                isCurrent ? "bg-primary" : "bg-transparent"
            }`}
        >
            <div
                className={`flex flex-col w-full lg:flex-row gap-x-2 items-center lg:items-start justify-center lg:justify-start`}
            >
                <img
                    src={member?.attributes?.avatar || MemberAvatar}
                    className="w-10 h-10 rounded-full mb-3 lg:mb-0"
                    alt={`${member.attributes.first_name} ${member.attributes.last_name}`}
                />

                <div className="flex flex-col lg:flex-row text-center justify-around lg:text-start w-full">
                    <div>
                        <p className="text-secondary text-base truncate">
                            {member.attributes.first_name}{" "}
                            {member.attributes.last_name}
                        </p>
                        <p
                            className={`text-xs truncate ${
                                isCurrent
                                    ? "text-secondary"
                                    : "text-grey-secondary"
                            }`}
                        >
                            {member.attributes.performance_test_type}
                        </p>
                    </div>
                    <div className="flex grow justify-center lg:justify-end mt-3 lg:mt-0">
                        <Checkbox
                            name="is_functional_movement_complete"
                            checked={
                                member.attributes
                                    .is_functional_movement_complete
                            }
                            containerClassName="flex flex-row-reverse items-center justify-between h-full"
                            variant="success"
                            readOnly={true}
                            isNotFormHook
                        />
                    </div>
                </div>
            </div>

            <div
                className={`flex flex-row ${
                    assessmentMode === "Standard"
                        ? "justify-between"
                        : "justify-end space-x-3"
                } mt-3`}
            >
                {assessmentMode === "Standard" && (
                    <p className="text-xs truncate text-secondary">
                        {classification}
                    </p>
                )}
                <p className="text-xs truncate text-secondary">
                    FMS:{" "}
                    {(fmsScore ?? 0) % 1 != 0 ? fmsScore?.toFixed(2) : fmsScore}
                </p>
                <p className="text-xs truncate text-secondary">
                    Perf: {calculatePerfScore()}
                </p>
            </div>
        </div>
    );
};

export default FunctionalMovementTab;
