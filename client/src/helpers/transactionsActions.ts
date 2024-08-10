import { toast } from "react-toastify";
import { instanceApi } from "../api/axios.api";
import { ICategory, ITransaction } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionsAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get("title"),
        amount: +formData.get("amount"),
        category: {
          id: +formData.get("category"),
        },
        type: formData.get("type"),
      };
      await instanceApi.post("/transactions", newTransaction);
      toast.success("Transaction created!");
      return null;
    }

    case "DELETE": {
      const formData = await request.formData();
      const transactionId = formData.get("id");

      await instanceApi.delete(`/transactions/transaction/${transactionId}`);
      toast.success("Transaction deleted!");
      return null;
    }
  }
};

export const getUserCategoriesAndTransactions = async () => {
  const categories = await instanceApi.get<ICategory[]>("/categories");
  const transactions = await instanceApi.get<ITransaction[]>("/transactions");

  const totalIncome = await instanceApi.get<number>(
    "/transactions/income/find"
  );
  const totalExpense = await instanceApi.get<number>(
    "/transactions/expense/find"
  );

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};
