export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: Date;
};

export type ActiveTab = "expenses" | "categories";
