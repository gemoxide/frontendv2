import { useEffect, useMemo, useState } from "react";
import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";
import { Tab } from "../../../../../../core/state/types";
import Tabs from "../../../../../../core/components/Tabs";
import FunctionalMovementTab from "./FunctionalMovementTab";
import FunctionalMovementForm from "./FunctionalMovementForm";

interface Props {
    groupAssessmentId: number;
    groupAssessmentMode: string;
    members: IGroupAssessmentMember[];
}

const FunctionalMovement: React.FC<Props> = ({
    groupAssessmentId,
    groupAssessmentMode,
    members,
}) => {
    const [tab, setTab] = useState(0);

    const calculateFmsScore = (member: IGroupAssessmentMember): number => {
        if (groupAssessmentMode === "Optimal Life") {
            return (
                (member?.attributes?.chair_stand_score || 0) +
                (member?.attributes?.seated_arm_curls_score || 0) +
                (member?.attributes?.chair_sit_reach_score || 0) +
                (member?.attributes?.back_scratch_score || 0) +
                (member?.attributes?.eight_up_go_score || 0) +
                (member?.attributes?.two_min_step_test_score || 0) 
            ) / 6;
        }
        return (
            (member?.attributes?.overhead_squat_score || 0) +
            (member?.attributes?.shoulder_score || 0) +
            (member?.attributes?.lunge_score || 0)
        );
    };

    const classification = (member: IGroupAssessmentMember): string => {
        const fmsScore = calculateFmsScore(member);
        if (fmsScore >= 0 && fmsScore <= 4) {
            return "Stability";
        } else if (fmsScore >= 5 && fmsScore <= 6) {
            return "Strength";
        } else if (fmsScore >= 7 && fmsScore <= 9) {
            return "Power";
        }

        return "No classification";
    };

    const tabs: Tab[] = useMemo(() => {
        return members.map((member, i) => {
            return {
                name: `${member.attributes.first_name} ${member.attributes.last_name}`,
                tabElement: (
                    <FunctionalMovementTab
                        member={member}
                        isCurrent={i === tab}
                        assessmentMode={groupAssessmentMode}
                        fmsScore={calculateFmsScore(member)}
                        classification={classification(member)}
                    />
                ),
                component: (
                    <FunctionalMovementForm
                        groupAssessmentId={groupAssessmentId}
                        groupAssessmentMode={groupAssessmentMode}
                        member={member}
                        key={member.id}
                        initialScore={calculateFmsScore(member)}
                    />
                ),
            };
        });
    }, [members, tab]);
    return (
        <div className="flex w-full gap-3">
            <Tabs
                tabsListClassName="w-full"
                tabClassName="w-[19%]"
                currentTabClass=""
                hasNoShadow
                orientation="vertical"
                tabs={tabs}
                current={tab || 0}
                onChangeTab={(key) => setTab(key)}
                isCustomized={true}
            />
        </div>
    );
};

export default FunctionalMovement;
