import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import defaultUserSvg from "../../../../../assets/icons/default-avatar.svg";
import logoSvg from "../../../../../assets/icons/logo.svg";
import notificationSvg from "../../../../../assets/icons/notification.svg";
import classNames from "classnames";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RootState } from "../../state/reducer";
import { useSelector } from "react-redux";
import { handleLogout } from "../../services/utils/utils.service";
import Search from "../Forms/Search/Search";
import { ROUTES } from "../../constants/routes";
import { mapDispatchToProps } from "../../state/reducer/reports";

const TopNavBar: React.FC = () => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { clearReports } = mapDispatchToProps();

    const parsedPersistedAuth = JSON.parse(
        localStorage.getItem("persist:auth") || "{}"
    );


    const handleSignOut = () => {
        clearReports();
        handleLogout();
    }

    const avatar = currentUser?.attributes?.avatar || defaultUserSvg;

    const navigate = useNavigate();

    const NotificationCountBadge = ({ count = 0 }) => {
        const notifCount = count;
        const rootClass = classNames(
            "h-4 w-4 absolute  rounded-full text-white text-xs bg-red-500 float-left text-center inset-y-0 right-0",
            {
                hidden: notifCount === 0,
            }
        );
        return <div className={rootClass}>{notifCount}</div>;
    };

    const userNavigation = [
        {
            name: "Your profile",
            action: () => navigate(ROUTES.SHARED.profile.key),
        },
        { name: "Sign out", action: handleSignOut },
    ];

    return (
        <div className="flex flex-col flex-1  p-2 lg:p-8 z-10">
            <div className="w-full sticky top-0 z-50 flex-shrink-0 flex h-16 bg-transparent">
                <div className="p-4 hidden xl:block self-center ">
                    <Link to="/">
                        <img
                            className="bg-gray-50 w-48"
                            src={logoSvg}
                            alt="Coach success logo"
                        />
                    </Link>
                </div>
                <div className="self-center items-center">
                    <label
                        htmlFor="leftSideDrawer"
                        className="px-4 border-r xl:hidden btn btn-link"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3BottomLeftIcon className="h-6 w-6 stroke-secondary" aria-hidden="true" />
                    </label>
                </div>
                <div className="flex w-10/12 justify-center self-center">
                </div>
                <div className="flex-1 px-4 flex justify-end items-center gap-x-4 lg:gap-x-6">
                    <Link to={"#"} className="p-1 rounded-full">
                        <div className="relative">
                            <NotificationCountBadge count={1} />
                            <div className={"rounded-full p-1 h-9 w-9"}>
                                <img src={notificationSvg} />
                            </div>
                        </div>
                    </Link>
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5 rounded-lg">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src={avatar}
                                alt="John Doe"
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <div>
                                    <p
                                        className="ml-4 text-xs font-semibold leading-6 text-secondary"
                                        aria-hidden="true"
                                    >
                                        {currentUser?.attributes?.first_name}
                                    </p>
                                    <span
                                        className="ml-4  text-xs font-semibold leading-6 text-grey-secondary"
                                        aria-hidden="true"
                                    >
                                        {currentUser?.attributes?.email}
                                    </span>
                                </div>
                                <ChevronDownIcon
                                    className="ml-2 h-6 w-6 text-primary"
                                    aria-hidden="true"
                                />
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right hover:cursor-pointer rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <span
                                                onClick={item?.action}
                                                className={classNames(
                                                    active ? "bg-gray-50" : "",
                                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
