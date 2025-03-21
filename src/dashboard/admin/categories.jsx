import { useEffect, useState } from "react";
import CategoriesModal from "../../components/modals/CategoriesModal";
import Table2 from "../../components/Table2";
import Sidebar from "../Sidebar";
import Loader from "../../components/notifications/Loader";

import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../../redux/action/category.action";
import toast from "react-hot-toast";
import { FaFolderOpen } from "react-icons/fa";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.getAllCategories
  );
  // delete category
  const { isSuccess, isError } = useSelector(
    (state) => state.adminDeleteCategory
  );
  const deleteCategoryHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
  };
  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    // get all categories
    dispatch(getAllCategoriesAction());

    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_CATEGORY_RESET " });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET " });
    }
    if (modalOpen === false) setCategory();
  }, [modalOpen, dispatch, isError, isSuccess]);
  return (
    <Sidebar>
      <CategoriesModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain font-medium hover:bg-main border border-subMain text-white p-4 rounded py-2 px-4 transition duration-500 ease-in-out flex flex-row items-center justify-center gap-4"
          >
            <HiPlusCircle />
            Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={deleteCategoryHandler}
          />
        ) : (
          <div className="flex flex-col items-center justify-center border border-border rounded p-6 bg-main text-white text-center">
            <FaFolderOpen className="text-4xl text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold">No categories available</h2>
            <p className="text-gray-400">Start by adding a new category</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 bg-subMain hover:bg-main text-white py-2 px-6 rounded transition duration-300 border border-subMain"
            >
              Add Category
            </button>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Categories;
