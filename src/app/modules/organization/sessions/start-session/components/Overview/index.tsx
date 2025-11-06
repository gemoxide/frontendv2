import { ISessionMember } from "../../../../../../core/interfaces/sessions.interface";
import MemberOverview from "./MemberOverview";

interface Props {
    sessionId: number;
    members: ISessionMember[];
    refreshMembers: () => void;
}

const Overview: React.FC<Props> = ({ sessionId, members, refreshMembers }) => {
    return (
        // <div className="flex w-full gap-x-3">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4">
            {members.map((member) => (
                <MemberOverview
                    sessionId={sessionId}
                    member={member}
                    key={member.id}
                    refreshMembers={refreshMembers}
                />
            ))}
        </div>
    );
};

export default Overview;
