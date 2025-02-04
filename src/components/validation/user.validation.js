import * as yup from "yup";

// login validation
const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required")
    .matches(/[0-9]/, "Password must contain a number"),
});

// registerValidation
const registerValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name is shorter then 20 characters")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only characters"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required")
    .matches(/[0-9]/, "Password must contain a number"),
});
export { loginValidation, registerValidation };
