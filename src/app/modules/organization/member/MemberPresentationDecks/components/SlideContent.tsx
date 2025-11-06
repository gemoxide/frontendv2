import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import Button from "../../../../../core/components/Button";
import ConditionalWrapper from "../../../../../core/components/ConditionalWrapper";
import { IPresentationDeckSlide } from "../../../../../core/interfaces/presentation-deck-slide.interface";
import SlideForm from "./SlideForm";
import { mapDispatchToProps } from "../../../../../core/state/reducer/answers";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { MemberFormAnswer } from "../../../../../core/interfaces/answers.interface";
import parse from "html-react-parser";
import { IMember } from "../../../../../core/interfaces/members.interface";
import { toast } from "react-toastify";

interface Props {
    id: number;
    slide: IPresentationDeckSlide;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    currentSlide: number;
    isCurrent?: boolean;
    updateCurrentSlide: () => void;
    refetchPreviousSlideContent: () => void;
    memberData?: IMember;
}

const SlideContent: React.FC<Props> = ({
    id,
    currentSlide,
    setCurrentSlide,
    slide,
    isCurrent,
    updateCurrentSlide,
    refetchPreviousSlideContent,
    memberData,
}) => {
    const { createAnswers } = mapDispatchToProps();

    const { data: getMemberData } = useSelector(
        (state: RootState) => state.members.getMember
    );

    const {
        loading: createAnswersLoading,
        success: createAnswersSuccess,
        error: createAnswersError,
    } = useSelector((state: RootState) => state.answers.createAnswers);

    const formik = useFormik({
        initialValues:
            slide.relationships.form?.relationships?.form_fields
                ?.filter(
                    (field) => field.attributes.type !== "header_separator"
                )
                .reduce((accumulator, field) => {
                    const field_name = field.relationships.form_contact_field
                        ? field.relationships.form_contact_field.attributes
                              .field_name
                        : field.attributes.label
                              .toLowerCase()
                              .replaceAll(" ", "_")
                              .replaceAll(",", "")
                              .replaceAll(".", "");
                    let field_value: any = "";

                    if (memberData) {
                        if (field_name in memberData.attributes) {
                            field_value =
                                memberData.attributes[
                                    field_name as keyof IMember["attributes"]
                                ];
                            switch (field_name) {
                                case "js1_at":
                                    field_value =
                                        memberData?.attributes
                                            ?.js1_deck_attached;
                                    break;
                                case "js3_at":
                                    field_value =
                                        memberData?.attributes
                                            ?.js3_deck_attached;
                                    break;
                            }
                        } else if (memberData?.attributes.custom_fields) {
                            if (
                                field_name in
                                memberData?.attributes.custom_fields
                            ) {
                                field_value =
                                    memberData?.attributes.custom_fields[
                                        field_name as keyof IMember["attributes"]["custom_fields"]
                                    ];
                            }
                        }
                    }

                    return {
                        ...accumulator,
                        [field_name]: field_value,
                    };
                }, {}) || {},
        validationSchema: Yup.object().shape(
            slide.relationships.form?.relationships?.form_fields
                ?.filter(
                    (field) => field.attributes.type !== "header_separator"
                )
                .reduce((accumulator, field) => {
                    const field_name = field.relationships.form_contact_field
                        ? field.relationships.form_contact_field.attributes
                              .field_name
                        : field.attributes.label
                              .toLowerCase()
                              .replaceAll(" ", "_")
                              .replaceAll(",", "")
                              .replaceAll(".", "");
                    let validation: any = Yup.string();
                    switch (field.attributes.type) {
                        case "email":
                            validation = validation.email("Invalid email");
                            break;
                        case "number":
                            validation = Yup.number();
                            break;
                        case "signature":
                            const name =
                                `${memberData?.attributes.first_name} ${memberData?.attributes.last_name}`.toUpperCase();
                            validation = validation.required(
                                "Signature is required"
                            );
                            break;
                        default:
                            break;
                    }
                    if (
                        field.attributes.is_required &&
                        field.attributes.type !== "signature"
                    ) {
                        validation = validation.required("Field is required");
                    }
                    if (field?.attributes?.is_required) {
                        return {
                            ...accumulator,
                            [field_name]: validation,
                        };
                    }
                    return accumulator;
                }, {}) || {}
        ),
        onSubmit: async (values, { resetForm }) => {
            const form = slide.relationships.form;
            const answers: MemberFormAnswer[] =
                form?.relationships?.form_fields
                    ?.filter(
                        (field) => field.attributes.type !== "header_separator"
                    )
                    .map((field) => {
                        const field_name = field.relationships
                            .form_contact_field
                            ? field.relationships.form_contact_field.attributes
                                  .field_name
                            : field.attributes.label
                                  .toLowerCase()
                                  .replaceAll(" ", "_")
                                  .replaceAll(",", "")
                                  .replaceAll(".", "");
                        return {
                            form_field_id: field.id,
                            answer: values[field_name as keyof typeof values],
                            field_name: field_name,
                        };
                    }) || [];
            const params = {
                answers: answers,
                member_presentation_deck_id: id,
                member_id: memberData?.id,
            };
            createAnswers(params);
            // resetForm();
            // setCurrentSlide(currentSlide + 1);
            // refetchPreviousSlideContent();
            // isLast ? completeDeck() : setCurrentSlide(currentSlide + 1);
        },
    });

    let content: React.ReactNode = <div></div>;

    switch (slide.attributes.type) {
        case "image":
            content = (
                <img
                    src={slide.attributes.slide_image}
                    alt=""
                    className="h-full mx-auto object-contain"
                />
            );
            break;
        case "free_text":
            content = parse(slide?.attributes?.content || "");
            break;
        case "yes_no":
            content = (
                <div className="flex flex-col gap-y-5 items-center justify-center h-full">
                    <h2>{slide.attributes.content}</h2>
                    <div className="flex justify-center gap-x-20">
                        <Button
                            label="No"
                            onClick={() =>
                                setCurrentSlide(
                                    slide?.attributes?.no_option_slide ||
                                        currentSlide
                                )
                            }
                        />
                        <Button
                            label="Yes"
                            onClick={() =>
                                setCurrentSlide(
                                    slide.attributes.yes_option_slide ||
                                        currentSlide
                                )
                            }
                        />
                    </div>
                </div>
            );
            break;
        case "form":
            content = (
                <SlideForm form={slide.relationships.form} formik={formik} />
            );

            break;
        default:
            break;
    }

    const handlePreviousClick = () => {
        refetchPreviousSlideContent();
        setCurrentSlide(currentSlide - 1);
    };

    useEffect(() => {
        if (createAnswersSuccess) {
            setCurrentSlide(currentSlide + 1);
        }
    }, [createAnswersSuccess]);

    useEffect(() => {
        if (createAnswersError) {
            toast.error("There was an error submitting your answers");
        }
    }, [createAnswersError]);

    return (
        <div
            className={`h-full flex-col gap-y-5 ${
                isCurrent ? "flex" : "hidden"
            }`}
        >
            <hr />
            {/* {slide.attributes.type !== "image" && <hr />} */}
            <ConditionalWrapper
                condition={slide.attributes.type === "form"}
                wrapper={(children: React.ReactNode) => (
                    <FormikProvider value={formik}>
                        <Form
                            action=""
                            className="flex flex-col gap-y-2 h-[92%]"
                        >
                            {children}{" "}
                        </Form>
                    </FormikProvider>
                )}
            >
                <>
                    <div
                        className={`grow h-auto ${
                            slide.attributes.type === "image"
                                ? "overflow-y-hidden"
                                : "overflow-y-auto"
                        }`}
                    >
                        {content}
                    </div>
                    <div className="flex justify-center gap-x-3 pt-8">
                        <Button
                            variant="secondary"
                            label="Exit Presentation"
                            onClick={updateCurrentSlide}
                        />
                        {currentSlide > 0 && (
                            <Button
                                variant="primary"
                                label="Previous"
                                isSubmitting={createAnswersLoading}
                                onClick={handlePreviousClick}
                            />
                        )}
                        {slide.attributes.type === "form" ? (
                            <Button
                                variant="primary"
                                label="Next"
                                isSubmitting={createAnswersLoading}
                                onClick={formik.submitForm}
                            />
                        ) : (
                            <Button
                                variant="primary"
                                label="Next"
                                type="button"
                                onClick={() =>
                                    setCurrentSlide(currentSlide + 1)
                                }
                            />
                        )}
                    </div>
                </>
            </ConditionalWrapper>
        </div>
    );
};

export default SlideContent;
