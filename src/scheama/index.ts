import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
    
