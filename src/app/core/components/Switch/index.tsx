interface Props {
    checked: boolean;
    handleChange: () => void;
}

const Switch: React.FC<Props> = ({ checked, handleChange }) => {
    return (
        <label className="relative inline-block w-16 h-8">
            <input
                type="checkbox"
                className="w-0 h-0 opacity-0"
                checked={checked}
                onChange={handleChange}
            />
            <span
                className={`absolute cursor-pointer inset-0 duration-[200ms] ease-in-out rounded-[34px] before:duration-[200ms] before:ease-in-out before:absolute before:w-7 before:h-7 before:top-0.5 before:left-0.5 before:rounded-full ${
                    checked
                        ? "bg-[#00004D] before:bg-primary before:translate-x-8"
                        : "bg-[#92929D] before:bg-white"
                }`}
            ></span>
        </label>
    );
};

export default Switch;
