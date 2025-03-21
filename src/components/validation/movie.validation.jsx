import * as yup from "yup";

const reviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Movie name is required")
    .max(50, "Movie name should be less than 50 characters"),
  imageTitle: yup.string().required("Image title is required"),
  time: yup.number("Number is required").required("Time is required"),
  language: yup.string().required("Language is required"),
  year: yup.number("Number is required").required("Year is required"),
  category: yup.string().required("Category is required"),
  desc: yup
    .string()
    .required("Description is required")
    .max(300, "Description should be less than 300 characters"),
});
export { reviewValidation, movieValidation };
