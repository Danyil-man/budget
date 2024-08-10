import { FC } from "react";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { ITransactionLoader } from "../types/types";
import { Chart } from "../components/Chart";
import { CURRENCY, TRANSACTION_PAGE_TEXTS } from "../constants";

export const TransactionsPage: FC = () => {
  const { totalIncome, totalExpense } = useLoaderData() as ITransactionLoader;
  return (
    <>
      <div className=" grid grid-cols-3 gap-4 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm />
        </div>
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-center text-md font-bold">
                {TRANSACTION_PAGE_TEXTS.TOTAL_INCOMES}
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                {CURRENCY}
                {totalIncome.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="uppercase text-center text-md font-bold">
                {TRANSACTION_PAGE_TEXTS.TOTAL_EXPENSES}
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-center mt-2">
                {CURRENCY}
                {totalExpense.toFixed(2)}
              </p>
            </div>
          </div>
          <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>

      <h1 className="my-5">{TRANSACTION_PAGE_TEXTS.NAME}</h1>
      <TransactionTable limit={5} />
    </>
  );
};
