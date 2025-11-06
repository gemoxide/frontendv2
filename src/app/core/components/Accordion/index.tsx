import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

interface Props {
    title: string;
    titleContainerClass?: string;
    content: React.ReactNode;
    contentContainerClass?: string;
}

const Accordion: React.FC<Props> = ({
    content,
    title,
    contentContainerClass,
    titleContainerClass,
}) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`flex w-full justify-between border-b border-solid border-b-[#E1E1FB] px-2 py-2 text-left text-sm font-medium text-[#11142D] hover:shadow-none ${titleContainerClass}`}
                    >
                        <span>{title}</span>
                        <ChevronUpIcon
                            className={`${
                                open ? "rotate-180 transform" : ""
                            } h-5 w-5`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel
                        className={`px-4 py-2 text-sm text-[#11142D] ${contentContainerClass}`}
                    >
                        {content}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Accordion;
