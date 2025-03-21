import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Input } from "../../components/userInput/userInput";
import mainbg from "/assets/mainbg.png";
import { FiLogIn } from "react-icons/fi";
import { InlineError } from "../../components/notifications/Error";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { registerAction } from "../../../redux/action/user.action";
import { RegisterValidation } from "../../components/validation/user.validation";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterValidation) });

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Welcome  ${userInfo?.fullName} to our website`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isError, isSuccess, navigate, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 flex flex-col items-center justify-center p-12 md:w-3/5 bg-dry rounded-lg border border-border gap-8"
        >
          <img
            src={mainbg}
            alt="mainbg"
            className="w-full h-24 object-contain"
          />
          <div className="w-full">
            <Input
              label={"Full Name"}
              placeholder={"Enter your name"}
              name="fullName"
              register={register("fullName")}
              type="text"
              bg={true}
            />
            {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>
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
            disabled={isLoading}
            type="submit"
            to={"/dashboard"}
            className="bg-subMain transition duration-500 ease-in-out hover:bg-main flex flex-row items-center justify-center gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {" "}
                <FiLogIn /> Sign Up
              </>
            )}
          </button>
          <p className="text-center text-border">
            Already have an account ? {""}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
