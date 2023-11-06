import { FC, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import * as yup from "yup";
import { useAppDispatch } from "../../state/store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { StyledInput } from "../../components/Input/Input.styles";
import {
  loginFailure,
  loginSuccess,
} from "../../state/features/auth/authSlice";
import axios from "axios";

interface ILoginFormValues {
  email: string;
  password: string;
}
interface IError {
  message: string;
}

export const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Login is required"),
    password: yup.string().min(5).required("Password is required"),
  });

  const onSubmit = async ({ email, password }: ILoginFormValues) => {
    try {
      setLoading(true);
      setStatus("");
      const response = await axios.post(
        "https://maszaweb.pl:1256/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      if (axios.isAxiosError<IError>(error)) {
        if (error.response) {
          setStatus(error.response.data.message);
        }
      }
    }
    setLoading(false);
  };

  const {
    values,
    errors,
    touched,
    status,
    setStatus,
    handleChange,
    handleSubmit,
  } = useFormik<ILoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: schema,
  });

  return (
    <>
      <Form onSubmit={handleSubmit} title="Login">
        <StyledInput
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email username"
          value={values.email}
          onChange={handleChange}
          $isError={errors.email && touched.email}
          errorMessage={errors.email}
          isTouched={touched.email}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          $isError={errors.password && touched.password}
          errorMessage={errors.password}
          isTouched={touched.password}
        />
        <ErrorMessage $isError={status}>{status}</ErrorMessage>
        <Button disabled={loading} type="submit">
          Log in
        </Button>
        <StyledMessage>
          No account ? <FormLink to="/register">Register</FormLink>
        </StyledMessage>
      </Form>
    </>
  );
};
