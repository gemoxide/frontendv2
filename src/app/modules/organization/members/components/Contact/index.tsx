import moment from "moment";
import AvatarContact from "../../../../../../../assets/icons/avatar-contact.svg";

type Props = {
    avatar?: string;
    name?: string;
    createdAt?: string;
};
const Contact: React.FC<Props> = ({ avatar, name, createdAt }) => {
    return (
        <div className="my-8 flex  items-center">
            <img src={avatar || AvatarContact} alt={name} className="w-12 h-12 rounded-md" />
            <div className="ml-4">
                <p className="font-bold text-md">{name}</p>
                {createdAt && (
                    <p className="text-grey-secondary font-bold text-xs">
                        Member since {moment(createdAt).format("MM.DD.YYYY")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Contact;
