export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserDTO {
  email: string;
  password: string;
}

export interface IResponseUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUserResponse {
  token: string;
  user: IResponseUser;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: Array<ITransaction>;
}

export interface ITransaction {
  amount: number;
  id: number;
  title: string;
  type: "income" | "expense";
  createdAt: string;
  updatedAt: string;
  category: ICategory;
}

export interface ITransactionLoader {
  categories: Array<ICategory>;
  transactions: Array<ITransaction>;
  totalIncome: number;
  totalExpense: number;
}
