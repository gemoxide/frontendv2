import { useEffect, useState } from "react";
import KebabDropdown from "../../../../core/components/KebabDropdown";
import Modal from "../../../../core/components/Modal";
import CreateMemberPresentationDeckForm from "./components/CreateMemberPresentationDecksForm";
import { mapDispatchToProps } from "../../../../core/state/reducer/member-presentation-decks";
import { mapDispatchToProps as mapDispatchMembersToProps } from "../../../../core/state/reducer/members";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { IMemberPresentationDeck } from "../../../../core/interfaces/member-presentation-decks.interface";
import Button from "../../../../core/components/Button";
import CustomDataTable from "../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { confirmDelete } from "../../../../core/helpers/prompt";
import LaunchPresentationDeck from "./components/LaunchMemberPresentationDeck";
import FormAnswers from "./components/FormAnswers";
import GrowSlideShow from "./GrowSlideShow";
import GrowAnswers from "./components/GrowAnswers";
import moment from "moment";
import { IMember } from "../../../../core/interfaces/members.interface";

interface Props {
    memberData?: IMember;
    fetchPreviousAnswers: () => void;
}

const MemberPresentationDecks: React.FC<Props> = ({
    memberData,
    fetchPreviousAnswers,
}) => {
    const { id } = useParams();
    const [
        isOpenCreateMemberPresentationDeckModal,
        setIsOpenCreateMemberPresentationDeckModal,
    ] = useState(false);
    const [isOpenAnswersModal, setIsOpenAnswersModal] = useState(false);
    const [isOpenLaunchDeckModal, setIsOpenLaunchDeckModal] = useState(false);
    const [selectedMemberPresentationDeck, setSelectedMemberPresentationDeck] =
        useState<IMemberPresentationDeck>();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const {
        getMemberPresentationDecks,
        getMemberPresentationDeck,
        deleteMemberPresentationDeck,
        updateMemberPresentationDeckUser,
        resetGetMemberPresentationDeck,
        resetCreateMemberPresentationDeck,
    } = mapDispatchToProps();
    const { getMember, resetGetMember } = mapDispatchMembersToProps();

    const {
        data: createPresentationDeckData,
        loading: createMemberPresentationDeckLoading,
        success: createMemberPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.createMemberPresentationDeck
    );

    const {
        data: growAnswerData,
        loading: growAnswerLoading,
        success: growAnswerSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.createGrowPresentationAnswer
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
        data: completeMemberPresentationDeckData,
        loading: completeMemberPresentationDeckLoading,
        success: completeMemberPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.completeMemberPresentationDeck
    );

    const {
        loading: updateMemberPresentationDeckLoading,
        success: updateMemberPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.updateMemberPresentationDeck
    );

    const {
        loading: deleteMemberPresentationDeckLoading,
        success: deleteMemberPresentationDeckSuccess,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.deleteMemberPresentationDeck
    );

    const {
        loading: getMemberPresentationDecksLoading,
        data: getMemberPresentationDecksData,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.getMemberPresentationDecks
    );

    const {
        loading: getMemberPresentationDeckLoading,
        success: getMemberPresentationDeckSuccess,
        data: getMemberPresentationDeckData,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.getMemberPresentationDeck
    );

    const fetchSelectedPresentationDeck = async (deck_id: string) => {
        if (id)
            getMemberPresentationDeck({
                member_id: id,
                member_presentation_deck_id: deck_id,
            });
    };

    const fetch = async () => {
        if (id)
            getMemberPresentationDecks({
                member_id: id,
                query: {
                    page,
                    per_page: perPage,
                },
            });
    };

    useEffect(() => {
        if (
            !getMemberPresentationDeckLoading &&
            getMemberPresentationDeckSuccess
        ) {
            setSelectedMemberPresentationDeck(getMemberPresentationDeckData);
            setIsOpenLaunchDeckModal(true);
        }
    }, [getMemberPresentationDeckLoading]);

    useEffect(() => {
        if (!growAnswerLoading && growAnswerSuccess) {
            setSelectedMemberPresentationDeck(growAnswerData);
        }
    }, [growAnswerLoading, growAnswerSuccess]);

    useEffect(() => {
        if (
            !updateMemberPresentationDeckCurrentSlideLoading &&
            updateMemberPresentationDeckCurrentSlideSuccess
        ) {
            setSelectedMemberPresentationDeck(undefined);
            setIsOpenLaunchDeckModal(false);
            resetGetMemberPresentationDeck();
            resetCreateMemberPresentationDeck();
            // if (id) {
            //     resetGetMember();
            //     getMember(id);
            // }
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
            setSelectedMemberPresentationDeck(undefined);
            setIsOpenLaunchDeckModal(false);
            resetGetMemberPresentationDeck();
            resetCreateMemberPresentationDeck();
            // if (id) {
            //     resetGetMember();
            //     getMember(id);
            // }
        }
    }, [
        completeMemberPresentationDeckLoading,
        completeMemberPresentationDeckSuccess,
    ]);

    useEffect(() => {
        if (
            !createMemberPresentationDeckLoading &&
            createMemberPresentationDeckSuccess
        ) {
            setIsOpenCreateMemberPresentationDeckModal(false);
            setSelectedMemberPresentationDeck(createPresentationDeckData);
            setIsOpenLaunchDeckModal(true);
        }
    }, [
        createMemberPresentationDeckLoading,
        createMemberPresentationDeckSuccess,
    ]);

    useEffect(() => {
        if (
            !updateMemberPresentationDeckLoading &&
            updateMemberPresentationDeckSuccess
        ) {
            setIsOpenCreateMemberPresentationDeckModal(false);
        }
    }, [updateMemberPresentationDeckLoading]);

    const closeLaunchModal = () => {
        setIsOpenLaunchDeckModal(false);
    };

    useEffect(() => {
        fetch();
    }, [page, perPage]);

    const columns: TableColumn<IMemberPresentationDeck>[] = [
        {
            name: "Name",
            cell: (memberPresentationDecks) =>
                memberPresentationDecks?.attributes?.custom_deck !== "Grow"
                    ? memberPresentationDecks?.relationships?.presentation_deck
                          ?.attributes?.name
                    : "Path to Success",
        },
        {
            name: "Date Completed",
            cell: (memberPresentationDecks) =>
                memberPresentationDecks?.attributes?.completed_at
                    ? moment(
                          memberPresentationDecks?.attributes?.completed_at
                      ).format("MM.DD.YYYY")
                    : "",
        },
        {
            name: "",
            sortable: false,
            cell: (memberPresentationDecks) => (
                <div className="w-full flex justify-end">
                    {!memberPresentationDecks?.attributes?.completed_at ? (
                        <KebabDropdown
                            placement="top"
                            lists={[
                                {
                                    label: "Launch",
                                    action: () => {
                                        fetchSelectedPresentationDeck(
                                            memberPresentationDecks.id
                                        );
                                        updateMemberPresentationDeckUser({
                                            id: memberPresentationDecks.id,
                                            member_id: id,
                                        });
                                    },
                                },
                                {
                                    label: "View Form Answers",
                                    action: () => {
                                        setIsOpenAnswersModal(true);
                                        setSelectedMemberPresentationDeck(
                                            memberPresentationDecks
                                        );
                                    },
                                },
                                {
                                    label: "Delete",
                                    action: async () => {
                                        const { isConfirmed } =
                                            await confirmDelete(
                                                "Member Presentation Deck"
                                            );
                                        if (isConfirmed && id) {
                                            deleteMemberPresentationDeck({
                                                member_id: id,
                                                id: memberPresentationDecks.id,
                                            });
                                        }
                                    },
                                    isDanger: true,
                                },
                            ]}
                        />
                    ) : (
                        <KebabDropdown
                            placement="top"
                            lists={[
                                {
                                    label: "View Form Answers",
                                    action: () => {
                                        setIsOpenAnswersModal(true);
                                        setSelectedMemberPresentationDeck(
                                            memberPresentationDecks
                                        );
                                    },
                                },
                            ]}
                        />
                    )}
                </div>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const handleRefetchPreviousAnswers = () => {
        fetchPreviousAnswers();
    };

    const loading =
        getMemberPresentationDecksLoading ||
        createMemberPresentationDeckLoading ||
        updateMemberPresentationDeckLoading ||
        deleteMemberPresentationDeckLoading;

    return (
        <div className="rounded-xl w-full bg-white shadow-lg py-4 px-2 mt-4">
            <div className="flex justify-between items-center p-4">
                <h3 className="text-secondary cursor-pointer font-bold">
                    Presentation Decks
                </h3>
                <Button
                    label="Launch Deck +"
                    onClick={() => {
                        setSelectedMemberPresentationDeck(undefined);
                        setIsOpenCreateMemberPresentationDeckModal(true);
                    }}
                />
            </div>
            <Modal
                isOpen={isOpenCreateMemberPresentationDeckModal}
                onClose={() =>
                    setIsOpenCreateMemberPresentationDeckModal(false)
                }
            >
                <CreateMemberPresentationDeckForm
                    selectedMemberPresentationDeck={
                        selectedMemberPresentationDeck
                    }
                />
            </Modal>
            <Modal isOpen={isOpenLaunchDeckModal} onClose={() => {}}>
                {selectedMemberPresentationDeck &&
                selectedMemberPresentationDeck?.attributes?.custom_deck ===
                    "Grow" ? (
                    <GrowSlideShow
                        memberId={id}
                        memberPresentationDeck={selectedMemberPresentationDeck}
                        closeLaunchModal={closeLaunchModal}
                    />
                ) : (
                    <LaunchPresentationDeck
                        memberId={id}
                        memberPresentationDeck={selectedMemberPresentationDeck}
                        closeLaunchModal={closeLaunchModal}
                        refetchPreviousSlideContent={
                            handleRefetchPreviousAnswers
                        }
                        memberData={memberData}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isOpenAnswersModal}
                onClose={() => setIsOpenAnswersModal(false)}
                modalContainerClassName="w-2/5"
            >
                {selectedMemberPresentationDeck?.attributes.custom_deck ===
                "Grow" ? (
                    <GrowAnswers id={selectedMemberPresentationDeck?.id} />
                ) : (
                    <FormAnswers id={selectedMemberPresentationDeck?.id} />
                )}
            </Modal>
            <CustomDataTable
                loading={loading}
                columns={columns}
                data={getMemberPresentationDecksData?.data || []}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={
                    getMemberPresentationDecksData?.meta?.total
                }
                paginationPerPage={perPage}
                isHideRowPerPage
                sortServer
            />
        </div>
    );
};

export default MemberPresentationDecks;
