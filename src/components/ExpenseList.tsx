import ExpenseItem from "./ExpenseItem";
import type { Expense } from "@/types/expense";
import { Card } from "@/components/ui/card";

type ExpenseListProps = {
  expenses: Expense[];
  editingId: string | null;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: Expense) => void;
  onStartEditing: (id: string) => void;
  onCancelEditing: () => void;
};

export default function ExpenseList({
  expenses,
  editingId,
  onDeleteExpense,
  onEditExpense,
  onCancelEditing,
  onStartEditing,
}: ExpenseListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 border-b border-muted pb-2 flex items-center gap-2">
        <span className="text-primary">💰</span> Expenses
      </h2>

      {expenses.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">
          No expenses added yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {expenses.map((expenseItem) => (
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
      )}
    </div>
  );
}
