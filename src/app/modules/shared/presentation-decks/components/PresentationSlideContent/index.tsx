import Select from "../../../../../core/components/Forms/Select";
import Loader from "../../../../../core/components/Loader";
import { PRESENTATION_DECK_SLIDE_TYPES_OPTIONS } from "../../../../../core/constants/presentation-deck-slide-types";
import {
    PresentationDeckSlide,
    PresentationDeckSlideType,
} from "../../../../../core/interfaces/presentation-deck-slide.interface";
import SlideForm from "../SlideForm";
import SlideFreeText from "../SlideFreeText";
import SlideImage from "../SlideImage";
import SlideYesNo from "../SlideYesNo";

interface Props {
    isSelected: boolean;
    slide?: PresentationDeckSlide;
    // setSlide: (slide: PresentationSlideSelect) => void;
    handleUpdateSelectedSlide: (slide: Partial<PresentationDeckSlide>) => void;
    isLoading?: boolean;
}

const PresentationSlideContent: React.FC<Props> = ({
    slide,
    isSelected,
    // setSlide,
    handleUpdateSelectedSlide,
    isLoading = false,
}) => {
    const handleUploadImage = (file: string) => {
        handleUpdateSelectedSlide({
            slide_image: file,
            form_id: undefined,
            content: undefined,
            yes_option_slide: undefined,
            no_option_slide: undefined,
        });
    };

    const handleUpdateFreeText = (text: string) => {
        handleUpdateSelectedSlide({
            content: text,
            slide_image: undefined,
            form_id: undefined,
            yes_option_slide: undefined,
            no_option_slide: undefined,
        });
    };

    const handleSelectForm = (form_id: number) => {
        handleUpdateSelectedSlide({
            content: undefined,
            slide_image: undefined,
            form_id: form_id,
            yes_option_slide: undefined,
            no_option_slide: undefined,
        });
    };

    const handleChangeNoOptionSlideRedirect = (no_option_slide?: number) => {
        handleUpdateSelectedSlide({
            content: undefined,
            slide_image: undefined,
            form_id: undefined,
            no_option_slide: no_option_slide,
        });
    };

    const handleChangeYesOptionSlideRedirect = (yes_option_slide?: number) => {
        handleUpdateSelectedSlide({
            content: undefined,
            slide_image: undefined,
            form_id: undefined,
            yes_option_slide: yes_option_slide,
        });
    };

    const handleYesNoTitle = (content?: string) => {
        handleUpdateSelectedSlide({
            content: content,
            slide_image: undefined,
            form_id: undefined,
        });
    };

    const getSlideEditor = () => {
        switch (slide?.type) {
            case "image":
                return (
                    <SlideImage
                        imageUrl={slide.slide_image}
                        handleUploadImage={handleUploadImage}
                        key={slide.id}
                    />
                );

            case "free_text":
                return (
                    <SlideFreeText
                        content={slide.content}
                        handleUpdateFreeText={handleUpdateFreeText}
                        key={slide.id}
                    />
                );

            case "form":
                return (
                    <SlideForm
                        handleSelectForm={handleSelectForm}
                        form_id={slide.form_id}
                        key={slide.id}
                    />
                );
            case "yes_no":
                return (
                    <SlideYesNo
                        no_option_slide={
                            slide.no_option_slide
                                ? slide.no_option_slide + 1
                                : undefined
                        }
                        yes_option_slide={
                            slide.yes_option_slide
                                ? slide.yes_option_slide + 1
                                : undefined
                        }
                        content={slide.content}
                        handleChangeNoOptionSlideRedirect={
                            handleChangeNoOptionSlideRedirect
                        }
                        handleChangeYesOptionSlideRedirect={
                            handleChangeYesOptionSlideRedirect
                        }
                        handleYesNoTitle={handleYesNoTitle}
                        key={slide.id}
                    />
                );
            default:
                return <div></div>;
        }
    };
    return (
        <div
            className={`${
                isSelected ? "flex" : "hidden"
            } flex-col mt-4 bg-white p-6 rounded`}
        >
            <div className="flex flex-col gap-y-3">
                <h2 className="text-2xl font-bold">Slide Content</h2>
                <div className="w-80">
                    <Select
                        label="Slide Type"
                        placeHolder="Slide Type"
                        name="slide_type"
                        options={PRESENTATION_DECK_SLIDE_TYPES_OPTIONS}
                        value={slide?.type}
                        onChange={(e) =>
                            handleUpdateSelectedSlide({
                                type: e.currentTarget
                                    .value as PresentationDeckSlideType,
                            })
                        }
                        isNotFormHook
                        autoComplete
                    />
                </div>
            </div>
            {getSlideEditor()}
        </div>
    );
    // );
};

export default PresentationSlideContent;
