import { useDispatch, useSelector } from "react-redux";
import Table2 from "../../components/Table2";
import Sidebar from "../Sidebar";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../redux/action/user.action";
import { useEffect } from "react";
import Loader from "../../components/notifications/Loader";
import toast from "react-hot-toast";

const Users = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );
  // delete user handler
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
    }
    dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
  }, [isError, deleteError, dispatch, isSuccess]);
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white">Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <h2 className="text-xl font-bold text-white">No users found</h2>
        )}
      </div>
    </Sidebar>
  );
};

export default Users;
