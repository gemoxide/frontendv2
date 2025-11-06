import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";
import MemberOverview from "./MemberOverview";

interface Props {
    groupAssessmentId: number;
    groupAssessmentMode: string;
    members: IGroupAssessmentMember[];
}

const Overview: React.FC<Props> = ({
    groupAssessmentId,
    groupAssessmentMode,
    members,
}) => {
    return (
        <div className="flex w-full gap-3 flex-wrap">
            {members.map((member) => (
                <MemberOverview
                    groupAssessmentId={groupAssessmentId}
                    groupAssessmentMode={groupAssessmentMode}
                    member={member}
                    key={member.id}
                />
            ))}
        </div>
    );
};

export default Overview;
