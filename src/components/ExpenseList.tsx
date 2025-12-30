// src/components/ExpenseList.tsx
import ExpenseItem from "./ExpenseItem";
import type { expense } from "@/types/expense";

type ExpenseListProps = {
  expense: expense[];
  editingExpense: expense | null;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: expense) => void;
};

export default function ExpenseList({
  expense,
  editingExpense,
  onDeleteExpense,
  onEditExpense,
}: ExpenseListProps) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-bold">Expenses</h2>
      {expense.length > 0 &&
        expense.map((expenseItem) => (
          <ExpenseItem
            key={expenseItem.id}
            expense={expenseItem}
            isEditing={editingExpense?.id === expenseItem.id}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onEditExpense}
          />
        ))}
    </div>
  );
}
