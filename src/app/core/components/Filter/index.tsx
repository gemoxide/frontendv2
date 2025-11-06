import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as FilterIcon } from "../../../../../assets/icons/filter.svg";
import Select from "../Forms/Select";
import Modal from "../Modal";
import {
    Form,
    FormikConfig,
    FormikProvider,
    FormikValues,
    useFormik,
} from "formik";
import Button from "../Button";

interface FilterList {
    label?: string;
    key: string;
    options: {
        label: string;
        value: string | number;
    }[];
}

interface Props {
    lists: FilterList[];
    onFilter: (params: any) => void;
}

const Filter: React.FC<Props> = ({ lists, onFilter }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues: Object.assign(
            {},
            ...lists.map((list) => ({ [list.key]: "" }))
        ),
        onSubmit: async (values) => {
            onFilter(values);
            setIsOpen(false);
        },
    });

    return (
        <div className="relative">
            <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-red-50 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 "
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FilterIcon />
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="w-full md:w-96 h-full flex flex-col items-center justify-center">
                    <FormikProvider value={formik}>
                        <Form className="space-y-4 w-full">
                            <h1 className="font-bold text-xl">Filters</h1>
                            {lists.map(({ key, label, options }, index) => (
                                <Select
                                    label={label}
                                    name={key}
                                    placeHolder={`Select ${label}`}
                                    autoComplete
                                    variant="default"
                                    options={options}
                                    key={index}
                                />
                            ))}
                            <div className="py-4">
                                <Button
                                    variant="primary"
                                    label="Filter"
                                    className={"w-full btn-md"}
                                    onClick={formik?.submitForm}
                                />
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </Modal>
        </div>
    );
};

export default Filter;
