import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
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

const MemberAvatarUpload: React.FC<Props> = ({ onDrop, src }) => {
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png"],
        },
    });
    const avatar = src || defaultUserSvg;

    return (
        <div
            {...getRootProps()}
            className="flex flex-col  md:flex-row md:items-center"
        >
            <div className="h-full w-auto relative">
                <LazyLoadImage
                    className="w-24 h-24 rounded-full"
                    src={avatar}
                    role="button"
                />
                <input {...getInputProps()} />
            </div>
        </div>
    );
};

export default MemberAvatarUpload;
