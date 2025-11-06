import TextBadge from "../../../../../core/components/TextBadge";

type Props = {
    memberType?: string;
    contactType?: string;
};

const Status: React.FC<Props> = ({ memberType, contactType }) => {
    return (
        <div className="my-8 w-3/4">
            <p className="mb-4">{memberType}</p>
            {contactType && <TextBadge label={contactType} variant="success" />}
        </div>
    );
};

export default Status;
