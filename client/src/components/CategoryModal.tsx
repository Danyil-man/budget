import { FC, useState } from "react";
import { Form } from "react-router-dom";
import { BTN_CANCEL, BTN_CREATE, BTN_SAVE } from "../constants";

interface ICategoryModal {
  type: "post" | "patch";
  id?: number;
  categoryTitle?: string;
  setVisibleModal: (visible: boolean) => void;
}

export const CategoryModal: FC<ICategoryModal> = ({
  type,
  id,
  categoryTitle,
  setVisibleModal,
}) => {
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>(
    categoryTitle ? categoryTitle : ""
  );
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action="/categories"
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
      >
        <label htmlFor="title">
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title..."
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
          />
          <input type="hidden" name="id" value={id} />
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisibleModal(false)}
            className="btn btn-red"
          >
            {BTN_CANCEL}
          </button>
          <button className="btn btn-green" type="submit">
            {type === "patch" ? BTN_SAVE : BTN_CREATE}
          </button>
        </div>
      </Form>
    </div>
  );
};
