import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../Button/Button";
import { Form } from "../../Form/Form";
import { FormLink, StyledMessage } from "../../Form/Form.style";
import { Input } from "../../Input/Input";
import { RegisterContainer } from "./Register.styles";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"


export const Register: FC = () => {

  const schema = yup.object().shape({
    login: yup.string().min(5, "Login must be at least 5 characters").required("Login is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
  })

  interface FormValues {
    login: string,
    password: string,
    confirmPassword:string,
  }

  const { register, handleSubmit, formState:{errors} } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit:SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <RegisterContainer>
      <Form onSubmit={handleSubmit(onSubmit)} title="Register">
        <Input
          type="login"
          placeholder="Login"
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
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" value="Register"/>
        <StyledMessage>
          You have an account ? <FormLink to="/login">Log in</FormLink>
        </StyledMessage>
      </Form>
    </RegisterContainer>
  );
};
