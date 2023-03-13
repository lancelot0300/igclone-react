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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setWait(true);
       await createUserWithEmailAndPassword(
        auth,
        data.login,
        data.password
      );
    } catch (error) {
      if (error instanceof Error) {
        setError("login", { type: "custom", message: error.message });
        navigate("/register");
      }
    }
    navigate("/");
    setWait(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Register">
      <Input
        type="email"
        placeholder="Email"
        name="login"
        register={register}
        error={errors.login?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        error={errors.password?.message}
        autocomplete="off"
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword?.message}
        autocomplete="off"
      />
      <Button disabled={wait} type="submit">
        Register
      </Button>
      <StyledMessage>
        You have an account ? <FormLink to="/login">Log in</FormLink>
      </StyledMessage>
    </Form>
  );
};
