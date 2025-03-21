/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/userInput/userInput";
import MainModal from "./MainModal";
import { useEffect, useState } from "react";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../../redux/action/category.action";
import toast from "react-hot-toast";

const CategoriesModal = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(""); // Input hiển thị
  const [updatedTitle, setUpdatedTitle] = useState(""); // Giữ giá trị sau khi update

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.adminCreateCategory
  );
  const {
    isLoading: updateLoading,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useSelector((state) => state.adminUpdateCategory);

  // Xử lý tạo/cập nhật danh mục
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      if (category) {
        dispatch(updateCategoryAction(category._id, { title }));
        setUpdatedTitle(title); // Giữ nguyên giá trị mới sau khi update
      } else {
        dispatch(createCategoryAction({ title }));
        setTitle(""); // Reset khi tạo mới
      }
    } else {
      toast.error("Please write category name");
    }
  };

  useEffect(() => {
    if (isError || updateError) {
      toast.error(updateError || isError);
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    if (isSuccess || updateSuccess) {
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // Khi mở modal, nếu chưa có updatedTitle thì lấy từ category
    if (modalOpen) {
      setTitle(updatedTitle || category?.title || "");
    }

    // Khi đóng modal, reset lại để lấy data mới từ API
    if (!modalOpen) {
      setTitle("");
      setUpdatedTitle("");
    }
  }, [
    isError,
    isSuccess,
    updateError,
    updateSuccess,
    category,
    modalOpen,
    dispatch,
    updatedTitle,
  ]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="w-full flex flex-col text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {category ? "Update" : "Create"}
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 text-left"
        >
          <Input
            label="Category Name"
            placeholder="Enter category name"
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || updateLoading}
            type="submit"
            className="w-full flex flex-col justify-center items-center py-2 font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain transition duration-500 ease-in-out text-white"
          >
            {isLoading || updateLoading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoriesModal;
