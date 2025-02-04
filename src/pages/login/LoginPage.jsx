import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../components/validation/user.validation";
import logo from "../../../assets/logo.png";
import { Input } from "../../components/userInput/userInput";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  // validate user
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({ resolver: yupResolver(loginValidation) });

  // handle login
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center mx-auto px-2 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white mx-auto border border-white p-5 rounded-md bg-black 2xl:w-2/5 gap-8 flex-col p-8 sm:p-14 "
      >
        <div>
          <img src={logo} alt="logo" className="object-cover h-25 w-full " />
        </div>
        <div className="mt-5 flex justify-center items-center bg-black text-3xl font-bold">
          Log In Form
        </div>
        <Input
          label={"Enter your email"}
          type="email"
          placeholder="Email"
          register={register}
        />
        <Input
          label={"Enter your password"}
          type="password"
          placeholder={"Password"}
          register={register}
        />
        <div className="w-full mt-10 bg-black flex justify-center">
          <button className="w-20 bg-white text-black rounded-md text-2xl font-bold">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
