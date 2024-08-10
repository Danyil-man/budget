import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ITransaction, ITransactionLoader } from "../types/types";
import { instanceApi } from "../api/axios.api";
import ReactPaginate from "react-paginate";
import { CURRENCY, TRANSACTION_TABLE_NAMES } from "../constants";

interface ITransactionTable {
  limit: number;
}

export const TransactionTable: FC<ITransactionTable> = ({ limit = 5 }) => {
  const { transactions } = useLoaderData() as ITransactionLoader;

  const [paginatedTransactions, setPaginatedTransactions] = useState<
    ITransaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getPaginatedTransactions = async (page: number) => {
    const response = await instanceApi.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setPaginatedTransactions(response.data);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    getPaginatedTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-sm"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={3}
        onPageChange={handlePageChange}
      />
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.NUMBER}</td>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.TITLE}</td>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.AMOUNT}</td>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.CATEGORY}</td>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.DATE}</td>
              <td className="font-bold">{TRANSACTION_TABLE_NAMES.TYPE}</td>
              <td className="text-right">{TRANSACTION_TABLE_NAMES.ACTION}</td>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction, idx) => (
              <tr key={transaction.id}>
                <td>{idx + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {CURRENCY}
                  {transaction.amount.toFixed(2)}
                </td>
                <td>{transaction.category?.title || "Other"}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td
                  className={
                    transaction.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {transaction.type}
                </td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
