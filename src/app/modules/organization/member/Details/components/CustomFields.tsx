import React from "react";

type CustomField = {
    name: string;
    value: string;
};

type Props = {
    content: CustomField[];
};

const CustomFields: React.FC<Props> = ({ content }) => {
    return (
        <div className="pl-9 pb-9 pt-2 max-w-xl">
            <h3 className="text-2xl font-bold mb-10">Custom Fields</h3>
            <div className="max-w-full max-h-96 overflow-y-auto pr-9">
                <div className="flex flex-col gap-y-10">
                    {content.map((field, index) => (
                        <div key={index}>
                            <h4 className="text-base font-bold mb-3">
                                {field.name}
                            </h4>
                            <p className="text-sm">{field.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomFields;
