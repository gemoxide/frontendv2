import { DropEvent, FileRejection } from "react-dropzone";
import ImageUpload from "../../../../../core/components/ImageUpload";

interface Props {
    imageUrl?: string;
    handleUploadImage: (file: string) => void;
}

const SlideImage: React.FC<Props> = ({ imageUrl, handleUploadImage }) => {
    const getBase64 = (file: File) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            handleUploadImage(reader.result ? reader.result.toString() : '');
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const onUploadImage = <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        getBase64(acceptedFiles[0])
    };

    return (
        <div className="flex">
            <ImageUpload
                src={imageUrl || ""}
                className="w-full"
                onDrop={onUploadImage}
            />
        </div>
    );
};

export default SlideImage;
