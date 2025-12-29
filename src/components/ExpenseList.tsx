// src/components/ExpenseList.tsx
import ExpenseItem from "./ExpenseItem";
import type { expense } from "@/types/expense";

type ExpenseListProps = {
  expense: expense[];
  onDeleteExpense?: (id: string) => void;
};

export default function ExpenseList({
  expense,
  onDeleteExpense,
}: ExpenseListProps) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-bold">Expenses</h2>
      {expense.length > 0 &&
        expense.map((expenseItem) => (
          <ExpenseItem
            key={expenseItem.id}
            expense={expenseItem}
            onDeleteExpense={onDeleteExpense}
          />
        ))}
    </div>
  );
}
