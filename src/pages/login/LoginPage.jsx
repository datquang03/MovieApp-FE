import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Input } from "../../components/userInput/userInput";
import mainbg from "/assets/mainbg.png";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../../components/validation/user.validation";
import { InlineError } from "../../components/notifications/Error";
import { loginAction } from "../../../redux/action/user.action";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Welcome back ${userInfo?.fullName}`);
    }
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [userInfo, isError, isSuccess, navigate, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 flex flex-col items-center justify-center sm:p-14 p-8 md:w-3/5 bg-dry rounded-lg border border-border gap-8"
        >
          <img
            src={mainbg}
            alt="mainbg"
            className="w-full h-24 object-contain"
          />
          <div className="w-full">
            <Input
              label={"Email"}
              placeholder={"Enter your email"}
              name="email"
              register={register("email")}
              type="email"
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label={"Password"}
              placeholder={"Enter your password"}
              name="password"
              register={register("password")}
              type="password"
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transition duration-500 ease-in-out hover:bg-main flex flex-row items-center justify-center gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              "Loading ..."
            ) : (
              <>
                <FiLogIn /> Sign In
              </>
            )}
          </button>
          <p className="text-center text-border">
            Don&apos;t have an account yet ?
            <Link to={"/register"} className="text-dryGray font-semibold ml-2">
              Register
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
