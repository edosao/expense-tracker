import type { Expense } from "@/types/expense";

export function getTotalByCategory(
  expenses: Expense[],
  category: string,
): number {
  return expenses
    .filter((expense) => expense.category === category)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

export function getTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}
