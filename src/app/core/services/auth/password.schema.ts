import * as Yup from "yup";

export const PasswordSchema = Yup.object().shape({
    password: Yup.string().required("This field is required")
        .test("isValidPass",
            " should contain at least one uppercase, one lowercase symbols and one number",
            (value: any, context: any) => {
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);

                let validConditions = 0;
                const numberOfMustBeValidConditions = 3;
                const conditions = [hasLowerCase, hasUpperCase, hasNumber];
                conditions.forEach((condition) =>
                    condition ? validConditions++ : null
                );
                
                return validConditions >= numberOfMustBeValidConditions;
            }),
    password_confirmation: Yup
        .string()
        .required("This field is required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
