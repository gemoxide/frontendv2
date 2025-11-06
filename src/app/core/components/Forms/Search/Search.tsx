import searchSvg from "../../../../../../assets/icons/search-normal.svg";

const Search = () => {
    return (
        <form className="flex items-center justify-center w-full lg:pl-24">
            <label className="sr-only text-secondary font-bold">Search</label>
            <div className="relative w-full">
                <input
                    type="text"
                    className="input text-md text-red font-bold rounded-full bg-transparent border border-secondary border-opacity-20 text-sm block w-full pl-10 p-2.5"
                    placeholder="Search"
                    required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <img src={searchSvg} />
                </div>
            </div>
        </form>
    );
};

export default Search;
