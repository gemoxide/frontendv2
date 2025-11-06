interface Props {
    tasks?: number;
    overdue?: number;
}

const Tasks: React.FC<Props> = ({ tasks = 0, overdue = 0 }) => {
    return (
        <div className="my-8 flex w-50">
            <div className="bg-primary rounded-full text-secondary w-6 h-6 flex items-center justify-center font-bold mr-4">
                {tasks}
            </div>
            <div className="bg-red-700 rounded-full text-white w-6 h-6 flex items-center justify-center font-bold">
                {overdue}
            </div>
        </div>
    );
};

export default Tasks;
