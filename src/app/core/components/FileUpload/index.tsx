import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

type Props = {
    onDrop?:
        | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent
          ) => void)
        | undefined;
};

const FileUpload: React.FC<Props> = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div
            {...getRootProps()}
            className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center"
        >
            <div className="space-y-1 text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <div className="text-sm text-gray-600 text-center">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary hover:text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <span>Upload a file or drag and drop</span>
                        <input {...getInputProps()} />
                    </label>
                </div>
                <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>
        </div>
    );
};

export default FileUpload;
