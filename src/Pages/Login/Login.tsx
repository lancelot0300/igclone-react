import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import { Input } from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../state/store";
import {
  initialState,
  loginSuccess,
} from "../../state/features/auth/authSlice";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/config";
import { useNavigate } from "react-router-dom";

interface ILoginFormValues {
  login: string;
  password: string;
}

export const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    login: yup.string().email("Invalid email format").required("Required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
    setLoading(true);
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, data.login, data.password)
        .then((userCredential) => {
          const user = {
            isAuth: true,
            email: userCredential.user.email || initialState.user.email,
            uid: userCredential.user.uid,
            avatar: userCredential.user.photoURL || initialState.user.avatar,
          };
          dispatch(loginSuccess(user));
          navigate("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              setError("login", {
                type: "manual",
                message: "User not found",
              });
              setLoading(false);
              break;
            case "auth/wrong-password":
              setError("password", {
                type: "manual",
                message: "Wrong password",
              });
              setLoading(false);
              break;
            default:
              setError("login", {
                type: "manual",
                message: error.message,
              });
              setLoading(false);
          }
        });
    });
  };

  return (
    <>
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
