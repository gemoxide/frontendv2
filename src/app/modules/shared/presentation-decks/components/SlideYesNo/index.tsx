import { DropEvent, FileRejection } from "react-dropzone";
import ImageUpload from "../../../../../core/components/ImageUpload";
import Input from "../../../../../core/components/Forms/Input";
import Textarea from "../../../../../core/components/Forms/TextArea";

interface Props {
    yes_option_slide?: number;
    no_option_slide?: number;
    content?: string;
    handleChangeNoOptionSlideRedirect: (no_option_slide?: number) => void;
    handleChangeYesOptionSlideRedirect: (yes_option_slide?: number) => void;
    handleYesNoTitle: (content?: string) => void;
}

const SlideYesNo: React.FC<Props> = ({
    yes_option_slide,
    no_option_slide,
    content,
    handleChangeNoOptionSlideRedirect,
    handleChangeYesOptionSlideRedirect,
    handleYesNoTitle,
}) => {
    return (
        <div className="flex flex-col mt-4 max-w-xs">
            <Textarea
                label="Title"
                name="content"
                placeHolder="Title"
                variant="primary"
                isNotFormHook
                value={content}
                onChange={(e) => handleYesNoTitle(e.target.value)}
            />
            <Input
                label="No Button Goes to Slide"
                name="no_option_slide"
                type="number"
                placeHolder="No Button Goes to Slide"
                autoComplete
                isNotFormHook
                variant="primary"
                value={no_option_slide}
                onChange={(e) =>
                    handleChangeNoOptionSlideRedirect(
                        e.currentTarget.valueAsNumber - 1
                    )
                }
            />
            <Input
                label="Yes Button Goes to Slide"
                name="yes_option_slide"
                type="number"
                placeHolder="Yes Button Goes to Slide"
                autoComplete
                isNotFormHook
                variant="primary"
                value={yes_option_slide}
                onChange={(e) =>
                    handleChangeYesOptionSlideRedirect(
                        e.currentTarget.valueAsNumber - 1
                    )
                }
            />
        </div>
    );
};

export default SlideYesNo;
