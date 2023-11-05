import { FC, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import * as yup from "yup";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useFormik } from "formik";
import { StyledInput } from "../../components/Input/Input.styles";
import { loginSuccess } from "../../state/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser } from "../../api/api";
import { useAppDispatch } from "../../state/store";


export const Register: FC = () => {
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mutation = useMutation(registerUser);
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onSubmit = async ({ email, password }: FormValues) => {
    setWait(true);
    const res = await mutation.mutateAsync({ email, password }).catch((err) => {
      setWait(false);
      setErrors({ email: err.message });
    });

    if (!res) return;

    console.log(res);
    setWait(false);
    dispatch(loginSuccess(res));
    navigate("/");
  };

  const { values, errors, touched, setErrors, handleChange, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit,
    });

  return (
    <Form onSubmit={handleSubmit} title="Register">
      <StyledInput
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        $isError={errors.email && touched.email ? true : false}
      />
      <ErrorMessage $isError={errors.email ? true : false}>
        {touched.email ? errors.email : ""}
      </ErrorMessage>
      <StyledInput
        type="password"
        placeholder="Password"
        name="password"
        autocomplete="off"
        value={values.password}
        onChange={handleChange}
        $isError={errors.password && touched.password ? true : false}
      />
      <ErrorMessage $isError={errors.password ? true : false}>
        {touched.password ? errors.password : ""}
      </ErrorMessage>
      <StyledInput
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        autocomplete="off"
        value={values.confirmPassword}
        onChange={handleChange}
        $isError={errors.confirmPassword && touched.confirmPassword ? true : false}
      />
      <ErrorMessage $isError={errors.confirmPassword ? true : false}>
      {touched.confirmPassword ? errors.confirmPassword : ""}
      </ErrorMessage>
      <Button disabled={wait} type="submit">
        Register
      </Button>
      <StyledMessage>
        You have an account ? <FormLink to="/login">Log in</FormLink>
      </StyledMessage>
    </Form>
  );
};

