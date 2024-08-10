import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ITransactionLoader } from "../types/types";
import { CategoryModal } from "./CategoryModal";
import {
  BTN_SUBMIT,
  CATEGORY_PAGE_TEXTS,
  TRANSACTION_PAGE_TEXTS,
  TRANSACTION_TYPE,
} from "../constants";

export const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as ITransactionLoader;
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <input
            type="text"
            className="input"
            placeholder="Title..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <input
            type="number"
            className="input"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>{CATEGORY_PAGE_TEXTS.NAME}</span>
            <select className="input" name="category" required>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">
            {TRANSACTION_PAGE_TEXTS.ALERT_MSG}
          </h1>
        )}

        <button
          onClick={() => setVisibleModal(true)}
          className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>{TRANSACTION_PAGE_TEXTS.MANAGE_CATEGORIES}</span>
        </button>

        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"income"}
              className="form-radio text-blue-600"
            />
            <span>{TRANSACTION_TYPE.INCOME}</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"expense"}
              className="form-radio text-blue-600"
            />
            <span>{TRANSACTION_TYPE.EXPENSE}</span>
          </label>
        </div>

        <button className="btn btn-green max-w-fit mt-2">{BTN_SUBMIT}</button>
      </Form>
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}
    </div>
  );
};
