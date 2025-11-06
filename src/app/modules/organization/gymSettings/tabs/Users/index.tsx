import { useState } from "react";
import UnderLineTabs from "../../../../../core/components/Tabs/UnderLineTabs";
import InvitedUsers from "../Users/tabs/Invited/InvitedUsers";
import Users from "../Users/tabs/Users/Users";

const UsersSettings = () => {
    const [tab, setTab] = useState(0);
    const tabs = [
        {
            name: "Users",
            component: <Users />,
        },
        {
            name: "Invitations",
            component: <InvitedUsers />,
        },
    ];

    return (
        <div className="rounded-lg">
            {tabs && (
                <UnderLineTabs
                    tabs={tabs}
                    current={tab || 0}
                    onChangeTab={(key) => setTab(key)}
                />
            )}
        </div>
    );
};

export default UsersSettings;
