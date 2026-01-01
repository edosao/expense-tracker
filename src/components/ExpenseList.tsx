import ExpenseItem from "./ExpenseItem";
import type { expense } from "@/types/expense";

type ExpenseListProps = {
  expense: expense[];
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: expense) => void;
};

export default function ExpenseList({
  expense,
  onDeleteExpense,
  onEditExpense,
}: ExpenseListProps) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-bold">Expenses</h2>
      {expense.map((expenseItem) => (
        <ExpenseItem
          key={expenseItem.id}
          expense={expenseItem}
          onDeleteExpense={onDeleteExpense}
          onSaveExpense={onEditExpense}
        />
      ))}
    </div>
  );
}
