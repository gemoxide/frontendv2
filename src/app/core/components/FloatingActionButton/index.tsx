interface Props {
    icon: React.ReactNode;
    onClick: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ icon, onClick }) => {
    return (
        <button
            className="fixed right-5 border border-solid border-grey-secondary rounded-full p-2 top-32 bg-white"
            onClick={onClick}
        >
            {icon}
        </button>
    );
};

export default FloatingActionButton;
