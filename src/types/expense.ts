export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
};

export type ActiveTab = "expenses" | "categories";
