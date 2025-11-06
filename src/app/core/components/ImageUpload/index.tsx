import classNames from "classnames";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
    multiple?: boolean;
    onDrop?:
        | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent
          ) => void)
        | undefined;
    src: File | File[] | string[] | string;
    loading?: boolean;
    className?: string;
    handleRemovePhoto?: (index: number) => void;
};

const ImageUpload: React.FC<Props> = ({
    multiple = false,
    onDrop,
    src,
    loading,
    className,
    handleRemovePhoto,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png"],
        },
        multiple: multiple,
    });
    return (
        <>
            {loading ? (
                <div className="h-46 flex mt-10">
                    <div className="mr-4">
                        <Skeleton height={300} width={250} />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Skeleton height={40} width={200} />
                        <Skeleton height={15} width={300} />
                        <Skeleton height={15} width={300} />
                    </div>
                </div>
            ) : (
                <>
                    <div
                        {...getRootProps()}
                        className={`mt-12 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center ${className}`}
                    >
                        {src && !Array.isArray(src) && !multiple && (
                            <div className="w-1/2">
                                <LazyLoadImage
                                    className="w-56 mr-12"
                                    src={
                                        typeof src === "string"
                                            ? src
                                            : URL.createObjectURL(src)
                                    }
                                />
                            </div>
                        )}
                        <div className="space-y-1 text-center flex flex-col justify-center">
                            <svg
                                className="mx-auto h-12 w-12 text-primary"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="text-sm text-gray-600 text-center">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer  rounded-md font-medium text-primary hover:text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span className="text-secondary text-xs">
                                        Drag Your Image to Upload
                                    </span>
                                    <input {...getInputProps()} />
                                </label>
                            </div>
                            <p className="text-secondary text-xs">
                                or{" "}
                                <span className="text-secondary font-bold cursor-pointer">
                                    Browse
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex gap-x-2 mt-2">
                        {src &&
                            Array.isArray(src) &&
                            multiple &&
                            src.map((img, i) => (
                                <div className="relative" key={i}>
                                    {handleRemovePhoto && (
                                        <button
                                            type="button"
                                            className="absolute -right-2 -top-2"
                                            onClick={() => handleRemovePhoto(i)}
                                        >
                                            <MinusCircleIcon className="w-4 fill-red-900" />
                                        </button>
                                    )}

                                    <LazyLoadImage
                                        className="w-20 rounded-sm"
                                        src={
                                            typeof img === "string"
                                                ? img
                                                : URL.createObjectURL(img)
                                        }
                                    />
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    );
};

export default ImageUpload;
