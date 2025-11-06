import AvatarContact from "../../../../../assets/icons/avatar-contact.svg";

type Props = {
    avatar?: string;
    name?: string;
};
const Avatar: React.FC<Props> = ({ avatar, name }) => {
    return (
        <div className="my-8 flex  items-center">
            <img
                src={avatar || AvatarContact}
                alt={name}
                className="w-12 h-12 rounded-md"
            />
        </div>
    );
};

export default Avatar;
