import { FC, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useFormik } from "formik";
import { StyledInput } from "../../components/Input/Input.styles";

export const Register: FC = () => {
  const [wait, setWait] = useState(false);
  const schema = yup.object().shape({
    login: yup.string().email("Invalid email format").required("Required"),
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
    login: string;
    password: string;
    confirmPassword: string;
  }

  const onSubmit = async ({ login, password }: FormValues) => {
    // setWait(true);
    // await createUserWithEmailAndPassword(auth, login, password).catch((err) =>
    //   setErrors({ confirmPassword: err.message })
    // );
    // setWait(false);
  };

  const { values, errors, touched, setErrors, handleChange, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        login: "",
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
        name="login"
        value={values.login}
        onChange={handleChange}
        $isError={errors.login && touched.login ? true : false}
      />
      <ErrorMessage $isError={errors.login ? true : false}>
        {touched.login ? errors.login : ""}
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
