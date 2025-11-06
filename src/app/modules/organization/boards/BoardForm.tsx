import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBoard } from "../../../core/interfaces/boards.interface";
import { mapDispatchToProps } from "../../../core/state/reducer/boards";
import { RootState } from "../../../core/state/reducer";
import { Form, FormikProvider, useFormik } from "formik";
import { CreateBoardScheme } from "../../../core/services/boards/boards.scheme";
import Input from "../../../core/components/Forms/Input";
import { preventNegative } from "../../../core/helpers/preventNegative";
import Button from "../../../core/components/Button";
import Select from "../../../core/components/Forms/Select";
import { SLIDE_TRANSITION_DROPDOWN } from "../../../core/constants/slide-transition";
import { RATIO_FORMAT_DROPDOWN } from "../../../core/constants/ratio-format";
import { SLIDE_TYPES } from "../../../core/constants/slide-types";
import Checkbox from "../../../core/components/Forms/CheckBox";
import { DropEvent, FileRejection } from "react-dropzone";
import ImageUpload from "../../../core/components/ImageUpload";

interface Props {
    selectedBoard?: IBoard;
    hasPhotos: boolean;
    setHasPhotos: (hasPhotos: boolean) => void;
}

const BoardForm: React.FC<Props> = ({
    hasPhotos,
    selectedBoard,
    setHasPhotos,
}) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const { createBoard, updateBoard } = mapDispatchToProps();

    const { loading: createBoardLoading } = useSelector(
        (state: RootState) => state.boards.createBoard
    );

    const { loading: updateBoardLoading } = useSelector(
        (state: RootState) => state.boards.updateBoard
    );

    useEffect(() => {
        setPhotos(
            selectedBoard?.attributes.photos?.map(
                (photo) => photo.attributes.url
            ) || []
        );
    }, [selectedBoard]);

    const formik = useFormik({
        initialValues: {
            id: selectedBoard?.id || undefined,
            name: selectedBoard?.attributes?.name || "",
            slide_delay: selectedBoard?.attributes?.slide_delay || undefined,
            photos_in_between:
                selectedBoard?.attributes?.photos_in_between || undefined,
            slide_transition: selectedBoard?.attributes?.slide_transition || "",
            ratio_format: selectedBoard?.attributes?.ratio_format || "",
            types: selectedBoard?.attributes?.types || [],
        },
        validationSchema: CreateBoardScheme,
        onSubmit: async (values) => {
            const body = { ...values, photos: photos };
            if (values?.id) updateBoard(body);
            else createBoard(body);
        },
    });

    const getBase64 = (file: File | Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setPhotos((prev) => [
                ...prev,
                reader.result ? reader.result.toString() : "",
            ]);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const onUploadImage = <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        acceptedFiles.forEach((file) => {
            getBase64(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setPhotos((prev) => prev.filter((img, i) => i !== index));
    };

    useEffect(() => {
        setHasPhotos(formik.values.types.includes("Photos"));
    }, [formik.values.types]);

    const loading = createBoardLoading || updateBoardLoading;

    return (
        <div
            className={`w-full ${
                hasPhotos ? "" : "md:w-96"
            } h-full flex items-center justify-center`}
        >
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedBoard?.id ? "Update Board" : "Create Board"}
                    </h1>
                    <div className="flex gap-x-5">
                        <div className={`${hasPhotos ? "w-96" : "w-full"}`}>
                            <Input
                                label="Name"
                                name="name"
                                type="text"
                                placeHolder="Name"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                            <label className="text-sm text-secondary font-bold">
                                Boards
                            </label>
                            {SLIDE_TYPES.map((type) => (
                                <Checkbox
                                    containerClassName="flex items-center my-2 gap-x-2"
                                    name="types"
                                    label={type}
                                    value={type}
                                    defaultChecked={formik.values.types.includes(
                                        type
                                    )}
                                    key={type}
                                />
                            ))}
                            <Input
                                label="Slide Delay"
                                name="slide_delay"
                                type="number"
                                placeHolder="Slide Delay"
                                min="0"
                                onKeyDown={preventNegative}
                                disabled={loading}
                                variant="default"
                            />
                            <Input
                                label="No. of Photos in Between"
                                name="photos_in_between"
                                type="number"
                                placeHolder="No. of Photos in Between"
                                min="0"
                                onKeyDown={preventNegative}
                                disabled={loading}
                                variant="default"
                            />
                            <Select
                                label="Slide Transition"
                                name="slide_transition"
                                placeHolder="Select Slide Transition"
                                autoComplete
                                variant="default"
                                options={SLIDE_TRANSITION_DROPDOWN}
                            />
                            <Select
                                label="Ratio Format"
                                name="ratio_format"
                                placeHolder="Select Ratio Format"
                                autoComplete
                                variant="default"
                                options={RATIO_FORMAT_DROPDOWN}
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
                        </div>
                        {hasPhotos && (
                            <div className="w-[-webkit-fill-available]">
                                <ImageUpload
                                    src={photos}
                                    onDrop={onUploadImage}
                                    handleRemovePhoto={handleRemoveImage}
                                    multiple
                                />
                            </div>
                        )}
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default BoardForm;
