import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/userInput/userInput";
import Sidebar from "./Sidebar";
import { PasswordValidation } from "../components/validation/user.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InlineError } from "../components/notifications/Error";
import { changePasswordAction } from "../../redux/action/user.action";
import { useEffect } from "react";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );

  // validate password
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });
  // on submit
  const onSubmit = (data) => {
    const user = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    dispatch(changePasswordAction(user));
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isError, isSuccess, message, reset, dispatch]);
  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Change Password</h2>
        <Input
          label="Previous Password"
          placeholder="Enter your previous password"
          type="password"
          bg={true}
          name={"oldPassword"}
          register={register("oldPassword")}
        />
        {errors.oldPassword && (
          <InlineError>{errors.oldPassword.message}</InlineError>
        )}
        <Input
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          bg={true}
          name={"newPassword"}
          register={register("newPassword")}
        />
        {errors.newPassword && (
          <InlineError>{errors.newPassword.message}</InlineError>
        )}
        <Input
          label="Confirm Password"
          placeholder="Enter your new password again"
          type="password"
          bg={true}
          name={"confirmPassword"}
          register={register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <InlineError>{errors.confirmPassword.message}</InlineError>
        )}

        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            className="bg-main font-medium hover:bg-subMain border border-subMain text-white p-4 rounded py-3 px-6 w-full sm:w-auto transition duration-500 ease-in-out"
          >
            {isLoading ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default ChangePassword;
