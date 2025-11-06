import file from "../../../../../../../assets/icons/file.svg";

type Props = {
    name?: string;
    url?: string;
    fileSize?: string;
};

const File: React.FC<Props> = ({ name, url, fileSize }) => {
    return (
        <div
            className="my-4 flex items-center hover:text-primary hover:cursor-pointer hover:bg-slate-50 hover:p-4"
            onClick={() => url && window.open(url)}
        >
            <div>
                <img src={file} className="w-14" />
            </div>
            <div className="flex flex-col justify-center ml-6">
                <text className="text-xl font-bold"> {name}</text>
                <text className="text-grey-secondary mt-2"> {fileSize}</text>
            </div>
        </div>
    );
};

export default File;
