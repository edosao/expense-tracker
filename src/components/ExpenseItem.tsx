// src/components/ExpenseItem.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: expense;
  isEditing?: boolean;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: expense) => void;
};

export default function ExpenseItem({
  expense,
  onDeleteExpense,
  onEditExpense,
  isEditing,
}: ExpenseItemProps) {
  return (
    <Card
      className={`p-4 flex justify-between items-center transition
    ${isEditing ? "ring-2 ring-primary bg-muted" : ""}`}
    >
      <div className="space-y-1">
        <h3 className="font-medium">{expense.title}</h3>
        <p className="text-sm text-muted-foreground">
          {expense.category} • {expense.date}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold">${expense.amount}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEditExpense?.(expense)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDeleteExpense?.(expense.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
