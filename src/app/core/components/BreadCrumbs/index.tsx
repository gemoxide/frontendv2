import React from "react";

const BreadCrumbs = ({ keys }: { keys: string[] }) => {
    return (
        <div className="flex gap-2 border-b py-3 px-6 border-line text-sm">
            {keys.map((key, index) => {
                return (
                    <React.Fragment key={key}>
                        {index === keys.length - 1 ? (
                            <div className={"font-semibold"}>{key}</div>
                        ) : (
                            <>
                                <div>{key}</div>
                                <div>/</div>
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
