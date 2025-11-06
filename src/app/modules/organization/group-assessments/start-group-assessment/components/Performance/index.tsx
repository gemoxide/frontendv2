import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";
import MemberPerformance from "./MemberPerformance";

interface Props {
    groupAssessmentId: number;
    groupAssessmentMode: string;
    members: IGroupAssessmentMember[];
}

const Performance: React.FC<Props> = ({
    groupAssessmentId,
    groupAssessmentMode,
    members,
}) => {
    return (
        <div className="flex w-full gap-3 flex-wrap">
            {members.map((member) => (
                <MemberPerformance
                    groupAssessmentId={groupAssessmentId}
                    member={member}
                    key={member.id}
                />
            ))}
        </div>
    );
};

export default Performance;
