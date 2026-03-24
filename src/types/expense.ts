export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
};

export type ActiveTab = "expenses" | "categories";
