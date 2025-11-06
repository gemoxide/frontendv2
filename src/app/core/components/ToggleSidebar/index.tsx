import { Transition } from "@headlessui/react";

interface Props {
    className?: string;
    show: boolean;
    children: React.ReactNode;
}

const ToggleSidebar: React.FC<Props> = ({
    show,
    children,
    className = "bg-white absolute top-0 right-0 h-full z-[100]",
}) => {
    return (
        <Transition
		className={className}
            show={show}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            // enterTo="translate-x-1/4"
            leave="transition ease-in-out duration-300 transform"
            leaveTo="translate-x-full"
        >
            {children}
        </Transition>
    );
};

export default ToggleSidebar;
