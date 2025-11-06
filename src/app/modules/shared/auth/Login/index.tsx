import { Form, FormikProvider, useFormik } from "formik";
import { LoginSchema } from "../../../../core/services/auth/auth.schema";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import Link from "../../../../core/components/Link";
import IllustrationSVG from "../../../../../../assets/img/illustration.svg";
import { ROUTES } from "../../../../core/constants/routes";
import { mapDispatchToProps } from "../../../../core/state/reducer/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { loginRequest } from "../../../../core/services/auth/auth.service";

const Login = () => {
  const { loading } = useSelector((state: RootState) => state.auth.login);
  const { login } = mapDispatchToProps();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      login(values);
    },
  });

  return (
    <div className="w-full flex h-full">
      <div className=" hidden md:flex w-1/2 items-center justify-center bg-neutral-100">
        <div>
          <div className="py-8">
            <p className="text-3xl text-secondary py-4">CCLPI Plans</p>
            <span className="text-grey-secondary text-xs">
              Where Everyone Matters
            </span>
          </div>
          <div className="py-4 flex justify-center items-center">
            <img src={IllustrationSVG} className="w-3/4" />
          </div>
        </div>
      </div>
      <div className=" w-full md:w-1/2  h-full flex items-center justify-center">
        <FormikProvider value={formik}>
          <Form className="space-y-4">
            <div className="py-12">
              <div className="text-2xl font-semibold text-secondary">
                Sign in to CCLPI Plans
              </div>
            </div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeHolder="Email Address"
              autoComplete
              disabled={loading}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeHolder="input your password in here"
              autoComplete
              disabled={loading}
              className="w-full"
            />
            <div className="text-center py-2">
              <Link
                to={ROUTES.AUTH.forgot_password.key}
                label="Forgot password?"
                variant="secondary"
              />
            </div>
            <div>
              <div className="py-2">
                <Button
                  variant="primary"
                  label="Log In"
                  isSubmitting={loading}
                  className={"w-full"}
                  type="submit"
                />
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
