import { FC, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { FormLink, StyledMessage } from "../../components/Form/Form.style";
import * as yup from "yup";
import { useAppDispatch } from "../../state/store";
import {useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { StyledInput } from "../../components/Input/Input.styles";
import { auth } from "../../config/config";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { initialState, loginFailure, loginSuccess } from "../../state/features/auth/authSlice";

interface ILoginFormValues {
  login: string;
  password: string;
}

export const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const schema = yup.object().shape({
    login: yup.string().email("Invalid email format").required("Login is required"),
    password: yup.string().min(5).required("Password is required"),
  });



  const onSubmit = async ({login, password} : ILoginFormValues) => {
    setLoading(true)
    await setPersistence(auth, browserLocalPersistence)

    const userCredential = await signInWithEmailAndPassword(
      auth,
      login,
      password
    ).catch(errors => {setErrors({password:errors.message})})

    if (!userCredential) 
    {
      dispatch(loginFailure);
      setLoading(false)
      return;
    };

    const user = {
      isAuth: true,
      email: userCredential.user.email || initialState.user.email,
      uid: userCredential.user.uid,
      photoURL: userCredential.user.photoURL || initialState.user.photoURL,
      displayName:
        userCredential.user.displayName || initialState.user.displayName,
    };
    dispatch(loginSuccess(user))
    navigate("/")
  };

  const {values,errors, touched,setErrors, handleChange, handleSubmit} = useFormik<ILoginFormValues>({initialValues: {
    login: "",
    password: "",
  },
  onSubmit,
  validationSchema: schema,
})

  return (
    <>
    
      <Form onSubmit={handleSubmit} title="Login">
        <StyledInput
          type="email"
          placeholder="Email"
          name="login"
          autocomplete="email username"
          value={values.login}
          onChange={handleChange}
          $isError={ errors.login && touched.login ? true : false}
        />
        <ErrorMessage $isError={ errors.login ? true : false}>{touched.login ? errors.login : ""}</ErrorMessage>
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          autocomplete="current-password"
          value={values.password}
          onChange={handleChange}
          $isError={ errors.password && touched.password ? true : false}
        />
        <ErrorMessage $isError={ errors.password && touched.password ? true : false}>{ touched.password ? errors.password : ""}</ErrorMessage>
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
