import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../core/interfaces/group-assessments.interface";
import MemberAvatar from "../../../../../../../../assets/img/default-user.png";
import Select from "../../../../../../core/components/Forms/Select";
import Checkbox from "../../../../../../core/components/Forms/CheckBox";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/group-assessments";
import { mapDispatchToProps as mapDispatchToMemberProps } from "../../../../../../core/state/reducer/members";
import { mapDispatchToProps as mapDispatchToMemberPresentationDeckProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import { performanceTestTypeOptions } from "../../../../../../core/constants/group-assessment-type-options";
import Button from "../../../../../../core/components/Button";
import { IMemberPresentationDeck } from "../../../../../../core/interfaces/member-presentation-decks.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../core/state/reducer";
import Modal from "../../../../../../core/components/Modal";
import LaunchPresentationDeck from "../../../../member/MemberPresentationDecks/components/LaunchMemberPresentationDeck";
import CreateNoteForm from "../../../../member/Details/Notes/CreateNotesForm";
import GrowSlideShow from "../../../../member/MemberPresentationDecks/GrowSlideShow";
import { ROUTES } from "../../../../../../core/constants/routes";

interface Props {
    groupAssessmentId: number;
    groupAssessmentMode: string;
    member: IGroupAssessmentMember;
}

type AssessmentKey =
    | "is_pre_assessment_complete"
    | "is_training_focus_complete"
    | "is_post_assessment_complete";
type DeckIdKey =
    | "member_training_focus_deck_id"
    | "member_pre_assessment_deck_id"
    | "member_post_assessment_deck_id";

const MemberOverview: React.FC<Props> = ({
    groupAssessmentId,
    groupAssessmentMode,
    member,
}) => {
    const [assessmentKey, setAssessmentKey] = useState<AssessmentKey>();
    const [deckKey, setDeckKey] = useState<DeckIdKey>();
    const [startSelfAssessment, setStartSelfAssessment] = useState(false);
    const [isOpenCreateNoteModal, setIsOpenCreateNoteModal] = useState(false);
    const [selectedMemberPresentationDeck, setSelectedMemberPresentationDeck] =
        useState<IMemberPresentationDeck>();
    const { updateMemberAssessment } = mapDispatchToProps();
    const { getMember, resetGetMember } = mapDispatchToMemberProps();
    const { getMemberPresentationDeck, resetGetMemberPresentationDeck } =
        mapDispatchToMemberPresentationDeckProps();

    const { loading: createNoteLoading, success: createNoteSuccess } =
        useSelector((state: RootState) => state.notes.createNote);

    const {
        loading: getMemberLoading,
        success: getMemberSuccess,
        data: getMemberData,
    } = useSelector((state: RootState) => state.members.getMember);

    const {
        data: completeMemberPresentationDeckData,
        loading: completeMemberPresentationDeckLoading,
        success: completeMemberPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.completeMemberPresentationDeck
    );

    const {
        data: updateMemberPresentationDeckCurrentSlideData,
        loading: updateMemberPresentationDeckCurrentSlideLoading,
        success: updateMemberPresentationDeckCurrentSlideSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks
                .updateMemberPresentationDeckCurrentSlide
    );

    const {
        loading: getMemberPresentationDeckLoading,
        success: getMemberPresentationDeckSuccess,
        data: getMemberPresentationDeckData,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.getMemberPresentationDeck
    );

    const {
        data: growAnswerData,
        loading: growAnswerLoading,
        success: growAnswerSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.createGrowPresentationAnswer
    );

    useEffect(() => {
        if (
            !getMemberPresentationDeckLoading &&
            getMemberPresentationDeckSuccess &&
            !getMemberLoading &&
            getMemberSuccess &&
            getMemberData?.id === member.id
        ) {
            setSelectedMemberPresentationDeck(getMemberPresentationDeckData);
            setStartSelfAssessment(true);
        }
    }, [
        getMemberPresentationDeckLoading,
        getMemberPresentationDeckSuccess,
        getMemberLoading,
        getMemberSuccess,
    ]);

    useEffect(() => {
        if (!growAnswerLoading && growAnswerSuccess) {
            setSelectedMemberPresentationDeck(growAnswerData);
        }
    }, [growAnswerLoading, growAnswerSuccess]);

    useEffect(() => {
        if (!createNoteLoading && createNoteSuccess) {
            setIsOpenCreateNoteModal(false);
        }
    }, [createNoteLoading]);

    useEffect(() => {
        if (
            !updateMemberPresentationDeckCurrentSlideLoading &&
            updateMemberPresentationDeckCurrentSlideSuccess
        ) {
            setSelectedMemberPresentationDeck(undefined);
            setStartSelfAssessment(false);
            resetGetMemberPresentationDeck();
            resetGetMember();
        }
    }, [
        updateMemberPresentationDeckCurrentSlideLoading,
        updateMemberPresentationDeckCurrentSlideSuccess,
    ]);

    useEffect(() => {
        if (
            !completeMemberPresentationDeckLoading &&
            completeMemberPresentationDeckSuccess
        ) {
            if (
                member.attributes[deckKey as keyof typeof member.attributes] ===
                completeMemberPresentationDeckData?.id
            )
                updateAssessment({
                    [assessmentKey as keyof UpdateMemberAssessmentParam]: true,
                });
            setSelectedMemberPresentationDeck(undefined);
            setStartSelfAssessment(false);
            resetGetMemberPresentationDeck();
            resetGetMember();
        }
    }, [
        completeMemberPresentationDeckLoading,
        completeMemberPresentationDeckSuccess,
    ]);

    const updateAssessment = (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => {
        updateMemberAssessment({
            ...param,
            group_assessment_id: groupAssessmentId,
            member_id: member.id,
        });
    };

    const handleUpdateAssessment = (name: string, value: number | string) => {
        updateAssessment({ [name]: value });
    };

    const handleStartSelfAssessment = (
        newAssessmentKey: AssessmentKey,
        newDeckKey: DeckIdKey,
        deckId?: string
    ) => {
        if (deckId) {
            setAssessmentKey(newAssessmentKey);
            setDeckKey(newDeckKey);
            getMember(member.id);
            getMemberPresentationDeck({
                member_id: member.id,
                member_presentation_deck_id: deckId,
            });
        }
    };

    const closeLaunchModal = () => {
        setStartSelfAssessment(false);
        setSelectedMemberPresentationDeck(undefined);
        resetGetMemberPresentationDeck();
    };

    const handleRefetchPreviousAnswers = () => {
        getMember(getMemberData?.id);
    };

    return (
        <div className="flex flex-col w-[23.6%] gap-y-4">
            {startSelfAssessment && (
                <Modal isOpen={true} onClose={closeLaunchModal}>
                    {selectedMemberPresentationDeck?.attributes.custom_deck ===
                    "Grow" ? (
                        <GrowSlideShow
                            memberId={member.id}
                            memberPresentationDeck={
                                selectedMemberPresentationDeck
                            }
                            closeLaunchModal={closeLaunchModal}
                            assessment={member}
                        />
                    ) : (
                        <LaunchPresentationDeck
                            memberId={member.id}
                            memberPresentationDeck={
                                selectedMemberPresentationDeck
                            }
                            closeLaunchModal={closeLaunchModal}
                            refetchPreviousSlideContent={
                                handleRefetchPreviousAnswers
                            }
                            memberData={getMemberData}
                        />
                    )}
                </Modal>
            )}
            <Modal
                isOpen={isOpenCreateNoteModal}
                onClose={() => setIsOpenCreateNoteModal(false)}
            >
                <CreateNoteForm
                    memberId={member.id}
                    groupAssessmentId={groupAssessmentId}
                />
            </Modal>
            <div className="flex flex-col lg:flex-row gap-x-2 items-center lg:items-start">
                <img
                    src={member?.attributes?.avatar || MemberAvatar}
                    className="w-10 h-10 rounded-full"
                    alt={`${member.attributes.first_name} ${member.attributes.last_name}`}
                />
                <div className="text-center lg:text-start">
                    <Link
                        to={ROUTES.USER.member.parse(member.id)}
                        target="_blank"
                    >
                        <p className="text-secondary text-base font-bold">
                            {member.attributes.first_name}{" "}
                            {member.attributes.last_name}
                        </p>
                    </Link>
                    <p className="text-grey-secondary text-xs">
                        {member.attributes.performance_test_type}
                    </p>
                </div>
            </div>
            <div className="flex flex-col border border-solid rounded-[10px] border-grey p-4 gap-y-3">
                {groupAssessmentMode === "Standard" && (
                    <Select
                        label="Performance Test Type"
                        placeHolder="Select Performance Test Type"
                        name="performance_test_type"
                        value={member.attributes.performance_test_type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const value = e.target.value;
                            handleUpdateAssessment(
                                "performance_test_type",
                                value
                            );
                        }}
                        variant="primary"
                        options={performanceTestTypeOptions}
                        isNotFormHook
                    />
                )}

                <Checkbox
                    name="is_body_scan_complete"
                    checked={member.attributes.is_body_scan_complete}
                    label="Body Scan & Measurements"
                    containerClassName="flex flex-row-reverse items-center justify-between"
                    variant="success"
                    readOnly
                    isNotFormHook
                />
                <Checkbox
                    name="is_functional_movement_complete"
                    checked={member.attributes.is_functional_movement_complete}
                    label="Functional Movement"
                    containerClassName="flex flex-row-reverse items-center justify-between"
                    variant="success"
                    readOnly
                    isNotFormHook
                />
                <Checkbox
                    name="is_performance_test_complete"
                    checked={member.attributes.is_performance_test_complete}
                    label="Performance Test"
                    containerClassName="flex flex-row-reverse items-center justify-between"
                    variant="success"
                    readOnly
                    isNotFormHook
                />
                {member.attributes.member_pre_assessment_deck_id && (
                    <Checkbox
                        name="is_pre_assessment_complete"
                        checked={member.attributes.is_pre_assessment_complete}
                        label="Deck 1"
                        containerClassName="flex flex-row-reverse items-center justify-between"
                        variant="success"
                        readOnly
                        isNotFormHook
                    />
                )}
                {member.attributes.member_training_focus_deck_id && (
                    <Checkbox
                        name="is_training_focus_complete"
                        checked={member.attributes.is_training_focus_complete}
                        label="Deck 2"
                        containerClassName="flex flex-row-reverse items-center justify-between"
                        variant="success"
                        readOnly
                        isNotFormHook
                    />
                )}
                {member.attributes.member_post_assessment_deck_id && (
                    <Checkbox
                        name="is_post_assessment_complete"
                        checked={member.attributes.is_post_assessment_complete}
                        label="Deck 3"
                        containerClassName="flex flex-row-reverse items-center justify-between"
                        variant="success"
                        readOnly
                        isNotFormHook
                    />
                )}
                {member.attributes.member_pre_assessment_deck_id && (
                    <Button
                        variant="secondary"
                        label="Deck 1"
                        className="mt-2 font-bold text-secondary text-xs"
                        onClick={() =>
                            handleStartSelfAssessment(
                                "is_pre_assessment_complete",
                                "member_pre_assessment_deck_id",
                                member.attributes.member_pre_assessment_deck_id
                            )
                        }
                    />
                )}
                {member.attributes.member_training_focus_deck_id && (
                    <Button
                        variant="secondary"
                        label="Deck 2"
                        className="mt-2 font-bold text-secondary text-xs"
                        onClick={() =>
                            handleStartSelfAssessment(
                                "is_training_focus_complete",
                                "member_training_focus_deck_id",
                                member.attributes.member_training_focus_deck_id
                            )
                        }
                    />
                )}
                {member.attributes.member_post_assessment_deck_id && (
                    <Button
                        variant="secondary"
                        label="Deck 3"
                        className="mt-2 font-bold text-secondary text-xs"
                        onClick={() =>
                            handleStartSelfAssessment(
                                "is_post_assessment_complete",
                                "member_post_assessment_deck_id",
                                member.attributes.member_post_assessment_deck_id
                            )
                        }
                    />
                )}
                <Button
                    variant="secondary"
                    label="Add Note"
                    className="font-bold text-secondary text-xs"
                    onClick={() => setIsOpenCreateNoteModal(true)}
                />
            </div>
        </div>
    );
};

export default MemberOverview;
