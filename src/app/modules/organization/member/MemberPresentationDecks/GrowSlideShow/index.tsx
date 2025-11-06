import { useState, useEffect } from "react";
import { IMemberPresentationDeck } from "../../../../../core/interfaces/member-presentation-decks.interface";
import { mapDispatchToProps } from "../../../../../core/state/reducer/member-presentation-decks";
import { IMember } from "../../../../../core/interfaces/members.interface";
import getGrowSlides from "./slides";
import { m } from "framer-motion";
import FinalSlide from "../components/FinalSlide";
import { IGroupAssessmentMember } from "../../../../../core/interfaces/group-assessments.interface";

interface Props {
    memberId?: any;
    memberPresentationDeck: IMemberPresentationDeck;
    assessment?: IGroupAssessmentMember;
    closeLaunchModal: () => void;
}

const GrowSlideShow: React.FC<Props> = ({
    memberId,
    memberPresentationDeck,
    assessment,
    closeLaunchModal,
}) => {
    const {
        completeMemberPresentationDeck,
        updateMemberPresentationDeckCurrentSlide,
        resetGetMemberPresentationDeck,
    } = mapDispatchToProps();

    const [currentSlide, setCurrentSlide] = useState(
        Number(memberPresentationDeck?.attributes?.current_slide ?? 0)
    );

    useEffect(() => {
        setCurrentSlide(
            Number(memberPresentationDeck?.attributes?.current_slide ?? 0)
        );
    }, [memberPresentationDeck?.id]);

    const [slides, setSlides] = useState(
        memberPresentationDeck?.relationships.presentation_deck?.relationships
            .presentation_deck_slides || []
    );

    const updateCurrentSlide = () => {
        updateMemberPresentationDeckCurrentSlide({
            id: memberPresentationDeck?.id,
            member_id: memberId,
            current_slide: currentSlide,
        });
    };

    const completeDeck = () => {
        completeMemberPresentationDeck({
            id: memberPresentationDeck?.id,
            member_id: memberId,
        });
        resetGetMemberPresentationDeck();
    };

    const growSlides = getGrowSlides({
        currentSlide: currentSlide,
        memberPresentationDeck: memberPresentationDeck,
        updateCurrentSlide: updateCurrentSlide,
        setCurrentSlide: setCurrentSlide,
        assessment: assessment,
    });

    return (
        <div className="w-[95vw] h-[90vh] px-5 pb-5 py-2 flex flex-col gap-y-5">
            {growSlides.map((slide, i) => slide)}
            <FinalSlide
                isCurrent={currentSlide === growSlides.length}
                completeDeck={completeDeck}
            />
        </div>
    );
};

export default GrowSlideShow;
