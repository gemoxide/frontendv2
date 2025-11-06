import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Option } from "../../interfaces/utils";

interface Props {
    value?: Option;
    onChange: (selected: Option) => void;
    options: Option[];
    label?: string;
    isDisabled?: boolean;
}

const SearchableSelect: React.FC<Props> = ({
    value,
    onChange,
    options,
    label,
    isDisabled,
}) => {
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) =>
                  option.label
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const inputClassNameRoot =
        "block w-full border-0 py-1.5 p-4 pr-10 text-secondary placeholder:text-grey-tertiary ring-1 ring-inset focus:ring-primary  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ring-primary rounded-lg h-12";

    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm text-secondary font-bold">
                    {label}
                </label>
            )}
            <Combobox value={value} onChange={onChange} disabled={isDisabled}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className={inputClassNameRoot}
                            displayValue={(option: Option) => option.label}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option, i) => (
                                    <Combobox.Option
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 text-secondary ${
                                                active &&
                                                "bg-primary text-secondary"
                                            }`
                                        }
                                        value={option}
                                        key={i}
                                    >
                                        {({ selected, active }) => (
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {option.label}
                                            </span>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default SearchableSelect;
