import { IMemberPresentationDeck } from "../../../../../../core/interfaces/member-presentation-decks.interface";
import Coaching from "./Coaching";
import GoalsMotivations from "./GoalsMotivations";
import GrowSummary from "./GrowSummary";
import Past from "./Past";
import PathToSuccess from "./PathToSuccess";
import Plans from "./Plans";
import Habits from "./Habits";
import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";

export interface GetGrowSlideProps {
    memberPresentationDeck: IMemberPresentationDeck;
    currentSlide: number;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    assessment?: IGroupAssessmentMember;
    updateCurrentSlide: () => void;
}

export interface GrowSlideProps {
    memberPresentationDeck: IMemberPresentationDeck;
    isCurrent: boolean;
    updateCurrentSlide: () => void;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    assessment?: IGroupAssessmentMember;
}

const getGrowSlides = ({
    memberPresentationDeck,
    currentSlide,
    updateCurrentSlide,
    setCurrentSlide,
    assessment,
}: GetGrowSlideProps) => [
    // <GoalsMotivations
    //     setCurrentSlide={setCurrentSlide}
    //     isCurrent={currentSlide === 0}
    //     memberPresentationDeck={memberPresentationDeck}
    //     updateCurrentSlide={updateCurrentSlide}
    //     key={0}
    // />,
    // <Past
    //     setCurrentSlide={setCurrentSlide}
    //     isCurrent={currentSlide === 1}
    //     memberPresentationDeck={memberPresentationDeck}
    //     updateCurrentSlide={updateCurrentSlide}
    //     key={1}
    // />,
    <Habits
        setCurrentSlide={setCurrentSlide}
        isCurrent={currentSlide === 0}
        memberPresentationDeck={memberPresentationDeck}
        updateCurrentSlide={updateCurrentSlide}
        key={0}
    />,
    <Coaching
        setCurrentSlide={setCurrentSlide}
        isCurrent={currentSlide === 1}
        memberPresentationDeck={memberPresentationDeck}
        updateCurrentSlide={updateCurrentSlide}
        key={1}
    />,
    <GrowSummary
        setCurrentSlide={setCurrentSlide}
        isCurrent={currentSlide === 2}
        memberPresentationDeck={memberPresentationDeck}
        updateCurrentSlide={updateCurrentSlide}
        key={2}
    />,
    <PathToSuccess
        setCurrentSlide={setCurrentSlide}
        isCurrent={currentSlide === 3}
        memberPresentationDeck={memberPresentationDeck}
        updateCurrentSlide={updateCurrentSlide}
        assessment={assessment}
        key={3}
    />,
    // <Plans
    //     setCurrentSlide={setCurrentSlide}
    //     isCurrent={currentSlide === 6}
    //     memberPresentationDeck={memberPresentationDeck}
    //     updateCurrentSlide={updateCurrentSlide}
    //     key={6}
    // />,
];

export default getGrowSlides;
