import { instanceApi } from "../api/axios.api";
import { ICategory } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const category = {
        title: formData.get("title"),
      };
      await instanceApi.post("/categories", category);
      return null;
    }

    case "PATCH": {
      const formData = await request.formData();
      const category = {
        id: formData.get("id"),
        title: formData.get("title"),
      };
      await instanceApi.patch(`/categories/category/${category.id}`, category);
      return null;
    }

    case "DELETE": {
      const formData = await request.formData();
      const categoryId = formData.get("id");

      await instanceApi.delete(`/categories/category/${categoryId}`);
      return null;
    }
  }
};

export const getUserCategories = async () => {
  const { data } = await instanceApi.get<ICategory[]>("/categories");
  return data;
};
