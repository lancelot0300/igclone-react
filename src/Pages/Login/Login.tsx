import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import { Input } from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login: FC = () => {

  const [wait, setWait] = useState(false);

  const schema = yup.object().shape({
    login: yup.string().email('Invalid email format').required('Required'),
    password: yup.string().required("Password is required"),
  });

  interface FormValues {
    login: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit:SubmitHandler<FormValues> = async (data) => {
    try {
      setWait(true);
      const user = await console.log('t');
    } 
    catch (error) {
      if(error instanceof Error) {
        setError("login", { type: 'custom', message: error.message });
      }
    }
    setWait(false);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Login">
      <Input
        type="login"
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
      />
      <Button disabled={wait} type="submit">Log in</Button>
      <StyledMessage>
        No account ? <FormLink to="/register">Register</FormLink>
      </StyledMessage>
    </Form>
  );
};
