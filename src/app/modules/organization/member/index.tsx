import { useEffect, useState } from "react";
import Section from "../../../core/components/Section";
import { mapDispatchToProps } from "../../../core/state/reducer/members";
import { useParams } from "react-router-dom";
import { RootState } from "../../../core/state/reducer";
import { useSelector } from "react-redux";
import TableList from "./TableList";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../../core/constants/routes";
import MemberSalesAgreementsTable from "./MemberSalesAgreementsTable";
import MemberPresentationDecks from "./MemberPresentationDecks";

const Members: React.FC = ({}) => {
    const { id } = useParams();
    const { getMember, resetGetMember } = mapDispatchToProps();

    const [memberId, setMemberId] = useState<number>(+id!);

    const {
        loading: getMemberLoading,
        success: getMemberSuccess,
        error: getMemberError,
        data: getMemberData,
    } = useSelector((state: RootState) => state.members.getMember);

    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            getMember(id);
        }
    }, [id]);

    useEffect(() => {
        if (!getMemberLoading && !getMemberSuccess && getMemberError) {
            resetGetMember();
            toast.error("User not found redirecting to members list");
            navigate(ROUTES.USER.members.key);
        }
    }, [getMemberLoading, getMemberSuccess, getMemberError]);

    const fetchPreviousAnswers = () => {
        if (id) {
            getMember(id);
        }
    };

    return (
        <>
            {/* {!getMemberSuccess ? (
                <div className="w-full justify-center flex items-center">
                    <Loader />
                </div>
            ) : ( */}
            <Section
                title={`${
                    getMemberData?.attributes.member_since ? "Member" : "Lead"
                } | ${getMemberData?.attributes?.first_name || ""} ${
                    getMemberData?.attributes?.last_name || ""
                }`}
            >
                <div className="h-full flex justify-start">
                    <div className="w-8/12 mr-6 flex flex-col gap-y-3">
                        <TableList />
                        <MemberSalesAgreementsTable
                            memberId={memberId}
                            memberGymId={getMemberData?.relationships.gym?.id}
                            refreshMemberData={fetchPreviousAnswers}
                        />
                        <MemberPresentationDecks
                            memberData={getMemberData}
                            fetchPreviousAnswers={fetchPreviousAnswers}
                        />
                    </div>
                    <div className="w-4/12 mt-4">
                        <Details />
                    </div>
                </div>
            </Section>
            {/* )} */}
        </>
    );
};

export default Members;
