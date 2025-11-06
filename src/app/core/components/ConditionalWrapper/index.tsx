interface Props {
    condition: boolean;
    wrapper: (children: React.ReactNode) => React.ReactNode;
    children: React.ReactNode;
}

const ConditionalWrapper: React.FC<Props> = ({
    condition,
    wrapper,
    children,
}) => <>{condition ? wrapper(children) : children}</>;

export default ConditionalWrapper;
