import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Button from "../Button";
import defaultUserSvg from "../../../../../assets/icons/default-avatar.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
type Props = {
    onDrop?:
        | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent
          ) => void)
        | undefined;

    src?: string;
};

const AvatarUpload: React.FC<Props> = ({ onDrop, src }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png"],
        },
    });
    const avatar = src || defaultUserSvg;

    return (
        <div
            {...getRootProps()}
            className="flex  w-full flex-col  md:flex-row md:w-1/2 md:items-center"
        >
            <div className="h-full w-auto  py-8 mr-12">
                <LazyLoadImage className="w-56" src={avatar} />
            </div>
            <div>
                <div className="text-sm text-gray-600 text-center flex">
                    <Button
                        label="Upload"
                        {...getInputProps()}
                        className="btn-sm mb-4"
                    />
                </div>
                <p className="text-xs text-gray-500">
                    Allowed file types: png, jpg, jpeg.
                </p>
            </div>
        </div>
    );
};

export default AvatarUpload;
