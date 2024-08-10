import { FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { CategoryModal } from "../components/CategoryModal";
import { ICategory } from "../types/types";
import { CATEGORY_PAGE_TEXTS } from "../constants";

export const CategoriesPage: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>();
  const [categoryTitle, setCategoryTitle] = useState<string>();

  const categories = useLoaderData() as ICategory[];

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>{CATEGORY_PAGE_TEXTS.LIST}</h1>
        <div className="mt-2 mb-2 flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
            >
              {category.title}
              <div className="absolute hidden group-hover:flex px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-center">
                <button
                  onClick={() => {
                    setCategoryId(category.id);
                    setCategoryTitle(category.title);
                    setIsEdit(true);
                  }}
                >
                  <AiFillEdit />
                </button>
                <Form
                  className="flex ml-2"
                  method="delete"
                  action="/categories"
                >
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <FaTrash />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>{CATEGORY_PAGE_TEXTS.CREATE}</span>
        </button>
      </div>

      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}

      {isEdit && (
        <CategoryModal
          type="patch"
          id={categoryId}
          categoryTitle={categoryTitle}
          setVisibleModal={setIsEdit}
        />
      )}
    </>
  );
};
