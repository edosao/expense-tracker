import ExpenseItem from "./ExpenseItem";
import type { expense } from "@/types/expense";

type ExpenseListProps = {
  expense: expense[];
  editingId: string | null;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: expense) => void;
  onStartEditing: (id: string) => void;
  onCancelEditing: () => void;
};

export default function ExpenseList({
  expense,
  editingId,
  onDeleteExpense,
  onEditExpense,
  onCancelEditing,
  onStartEditing,
}: ExpenseListProps) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-bold">Expenses</h2>
      {expense.map((expenseItem) => (
        <ExpenseItem
          key={expenseItem.id}
          expense={expenseItem}
          editingId={editingId}
          onDeleteExpense={onDeleteExpense}
          onSaveExpense={onEditExpense}
          onStartEditing={onStartEditing}
          onCancelEditing={onCancelEditing}
        />
      ))}
    </div>
  );
}
