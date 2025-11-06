import { useState } from "react";
import Section from "../../../core/components/Section";
import Tabs from "../../../core/components/Tabs";
import Account from "./tabs/Account";
import Security from "./tabs/Security";

const Profile = () => {
    const [tab, setTab] = useState(0);
    const tabs = [
        {
            name: "Account",
            component: <Account />,
        },
        {
            name: "Security",
            component: <Security />,
        },
    ];

    return (
        <Section title="My Profile">
            <div className="mt-8 rounded-lg py-4">
                {tabs && (
                    <Tabs
                        tabs={tabs}
                        current={tab || 0}
                        onChangeTab={(key) => setTab(key)}
                    />
                )}
            </div>
        </Section>
    );
};

export default Profile;
