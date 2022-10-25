import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../Button/Button";
import { Form } from "../../Form/Form";
import { FormLink, StyledMessage } from "../../Form/Form.style";
import { Input } from "../../Input/Input";
import { LoginContainer } from "./Login.styles";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"


export const Login: FC = () => {

  const schema = yup.object().shape({
    login: yup.string().required("Login is required"),
    password: yup.string().required("Password is required"),
  })

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data : {}) => {
    console.log(data);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)} title="Login">
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
        <Button></Button>
        <StyledMessage>
          No account ? <FormLink to="/register">Register</FormLink>
        </StyledMessage>
      </Form>
    </LoginContainer>
  );
};
