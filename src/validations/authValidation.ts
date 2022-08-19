import * as Yup from 'yup';

export const AuthValidation = Yup.object().shape({
  username: Yup.string().required("Username wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
})
