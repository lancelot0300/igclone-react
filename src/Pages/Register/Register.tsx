import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import { Input } from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../config/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useFormik } from "formik";

export const Register: FC = () => {
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
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
    setWait(true);
    await createUserWithEmailAndPassword(auth, login, password).catch((err) =>
      setErrors({ confirmPassword: err.message })
    );
    setWait(false);
  };

  const { values, errors, setErrors, handleChange, handleSubmit } =
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
      <Input
        type="email"
        placeholder="Email"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <ErrorMessage $isError={errors.login ? true : false}>
        {errors && errors.login}
      </ErrorMessage>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        autocomplete="off"
        value={values.password}
        onChange={handleChange}
      />
      <ErrorMessage $isError={errors.password ? true : false}>
        {errors && errors.password}
      </ErrorMessage>
      <Input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        autocomplete="off"
        value={values.confirmPassword}
        onChange={handleChange}
      />
      <ErrorMessage $isError={errors.confirmPassword ? true : false}>
        {errors && errors.confirmPassword}
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
