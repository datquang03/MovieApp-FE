import axiosClient from "./axios";

// get all categories
const getAllCategoriesService = async () => {
  const { data } = await axiosClient.get("/categories");
  return data;
};

// create category
const createCategoryService = async (title, token) => {
  const { data } = await axiosClient.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete category
const deleteCategoryService = async (id, token) => {
  const { data } = await axiosClient.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update category
const updateCategoryService = async (id, title, token) => {
  const { data } = await axiosClient.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export {
  getAllCategoriesService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
