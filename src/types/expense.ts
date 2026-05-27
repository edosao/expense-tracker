export interface Note {
  id: string;
  content: string;
  expense_id: string;
}

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: number;
  notes: Note[];
};

export type ActiveTab = "expenses" | "categories";
