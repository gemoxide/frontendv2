import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./SlideFreeText.styles.scss";

interface Props {
    content?: string;
    handleUpdateFreeText: (text: string) => void;
}

const SlideFreeText: React.FC<Props> = ({ content, handleUpdateFreeText }) => {
    const modules = {
        toolbar: [
            [{ font: ["serif", "sans-serif"] }],
            [{ header: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" },
            ],
            [{ color: [] }],
            [{ size: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "font",
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "align",
        "color",
        "size",
        "link",
        "image",
    ];

    const handleChange = (content: string) => {
        const wrappedContent = `<div class="no-border ql-container ql-snow"><div class="ql-editor">${content}</div></div>`;
        handleUpdateFreeText(wrappedContent);
    };

    return (
        <div className="flex w-full mt-4 free-text-editor-container">
            <ReactQuill
                className="w-full h-fit border border-primary rounded-md p-2 bg-tertiary"
                modules={modules}
                formats={formats}
                theme="snow"
                defaultValue={content}
                onChange={handleChange}
            />
        </div>
    );
};

export default SlideFreeText;
