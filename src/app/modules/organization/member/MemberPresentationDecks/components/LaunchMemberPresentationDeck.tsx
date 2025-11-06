import { useState, useEffect } from "react";
import { IMemberPresentationDeck } from "../../../../../core/interfaces/member-presentation-decks.interface";
import SlideContent from "./SlideContent";
import { mapDispatchToProps } from "../../../../../core/state/reducer/member-presentation-decks";
import { mapDispatchToProps as mapDispatchToMemberProps } from "../../../../../core/state/reducer/members";
import Button from "../../../../../core/components/Button";
import FinalSlide from "./FinalSlide";
import { IMember } from "../../../../../core/interfaces/members.interface";

interface Props {
    memberId?: string;
    memberPresentationDeck?: IMemberPresentationDeck;
    closeLaunchModal: () => void;
    refetchPreviousSlideContent: () => void;
    memberData?: IMember;
}

const LaunchPresentationDeck: React.FC<Props> = ({
    memberId,
    memberPresentationDeck,
    closeLaunchModal,
    refetchPreviousSlideContent,
    memberData,
}) => {
    const {
        completeMemberPresentationDeck,
        updateMemberPresentationDeckCurrentSlide,
        resetGetMemberPresentationDeck,
    } = mapDispatchToProps();

    const { getMember, resetGetMember } = mapDispatchToMemberProps();

    const [currentSlide, setCurrentSlide] = useState(
        memberPresentationDeck?.attributes.current_slide || 0
    );

    useEffect(() => {
        setCurrentSlide(memberPresentationDeck?.attributes.current_slide || 0);
    }, [memberPresentationDeck?.id]);

    const [slides, setSlides] = useState(
        memberPresentationDeck?.relationships.presentation_deck?.relationships
            .presentation_deck_slides || []
    );

    useEffect(() => {
        setSlides(
            memberPresentationDeck?.relationships.presentation_deck
                ?.relationships.presentation_deck_slides || []
        );
    }, [memberPresentationDeck?.id]);

    const updateCurrentSlide = () => {
        updateMemberPresentationDeckCurrentSlide({
            id: memberPresentationDeck?.id,
            member_id: memberId,
            current_slide: currentSlide,
        });

        if (memberId) getMember(memberId);
    };

    const completeDeck = () => {
        completeMemberPresentationDeck({
            id: memberPresentationDeck?.id,
            member_id: memberId,
        });
        resetGetMemberPresentationDeck();

        if (memberId) getMember(memberId);
    };

    return (
        <div className="w-[95vw] h-[90vh] px-5 pb-5 py-2 flex flex-col gap-y-5">
            <h2 className="text-2xl font-extrabold text-secondary">
                {
                    memberPresentationDeck?.relationships.presentation_deck
                        ?.attributes.name
                }
            </h2>
            {slides.length ? (
                <>
                    {slides.map((slide, i) => {
                        return (
                            <SlideContent
                                id={memberPresentationDeck?.id || 0}
                                currentSlide={currentSlide}
                                setCurrentSlide={setCurrentSlide}
                                slide={slide}
                                isCurrent={i === currentSlide}
                                updateCurrentSlide={updateCurrentSlide}
                                key={i}
                                refetchPreviousSlideContent={
                                    refetchPreviousSlideContent
                                }
                                memberData={memberData}
                            />
                        );
                    })}
                    <FinalSlide
                        isCurrent={currentSlide === slides.length}
                        completeDeck={completeDeck}
                    />
                </>
            ) : (
                <>
                    <div className="grow"></div>
                    <div className="flex justify-start">
                        <Button
                            variant="secondary"
                            label="Exit Presentation"
                            onClick={closeLaunchModal}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LaunchPresentationDeck;
