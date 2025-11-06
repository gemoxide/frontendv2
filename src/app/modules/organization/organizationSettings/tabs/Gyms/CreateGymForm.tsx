import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/gyms";
import { IGym } from "../../../../../core/interfaces/gyms.interface";
import { CreateGymScheme } from "../../../../../core/services/gyms/gyms.scheme";

type Props = {
    selectedGym?: IGym;
};

const CreateGymForm: React.FC<Props> = ({ selectedGym }) => {
    const { createGym, updateGym } = mapDispatchToProps();

    const { loading: createGymLoading } = useSelector(
        (state: RootState) => state.gyms.createGym
    );

    const { loading: updateGymLoading } = useSelector(
        (state: RootState) => state.gyms.updateGym
    );

    const formik = useFormik({
        initialValues: {
            id: selectedGym?.id || "",
            name: selectedGym?.attributes?.name || "",
            address: selectedGym?.attributes?.address || "",
        },
        validationSchema: CreateGymScheme,
        onSubmit: async (values) => {
            if (selectedGym?.id) updateGym(values);
            else createGym(values);
        },
    });

    const loading = createGymLoading || updateGymLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedGym?.id ? "Update Location" : "Create Location"}
                    </h1>

                    <Input
                        label="Location Name"
                        name="name"
                        type="text"
                        placeHolder="Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Address"
                        name="address"
                        type="text"
                        placeHolder="Address"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateGymForm;
