export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: number;
};

export type ActiveTab = "expenses" | "categories";
