import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface EditableTextItemProps {
    // initialValue: string | number;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    name: string;
    value?: any;
}

const EditableTextItem: React.FC<EditableTextItemProps> = ({
    // initialValue,
    onBlur,
    name,
    value,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [text, setText] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setIsEditing(true);
    };

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setText(event.target.value);
    // };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        // <div onClick={handleClick} className="flex justify-end">
        //     {isEditing ? (
        <div className="flex justify-end">
            <input
                className="text-right block w-16 border-1 border-primary py-0.5 pr-5 text-secondary placeholder:text-grey-tertiary ring-inset focus:ring-primary sm:text-xs rounded-lg"
                // value={text}
                // onChange={handleChange}
                onBlur={onBlur}
                name={name}
                value={value}
            />
        </div>
        // ) : (
        //     <span title="Click to edit" role="button" className="underline">
        //         {text}
        //     </span>
        // )}
        // </div>
    );
};

export default EditableTextItem;
