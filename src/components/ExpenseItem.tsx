import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: expense;
  editingId: string | null;
  onDeleteExpense?: (id: string) => void;
  onSaveExpense?: (expense: expense) => void;
  onStartEditing: (id: string) => void;
  onCancelEditing: () => void;
};

export default function ExpenseItem({
  expense,
  editingId,
  onDeleteExpense,
  onSaveExpense,
  onStartEditing,
  onCancelEditing,
}: ExpenseItemProps) {
  const [localExpense, setLocalExpense] = useState(expense);

  const handleSave = () => {
    onSaveExpense?.(localExpense);
    onCancelEditing();
  };

  const handleCancel = () => {
    // setLocalExpense(expense); // rollback
    onCancelEditing();
  };

  return (
    <Card className="p-4 transition-all duration-300">
      {editingId === expense.id ? (
        <div className="space-y-3">
          <Input
            value={localExpense.title}
            onChange={(e) =>
              setLocalExpense({ ...localExpense, title: e.target.value })
            }
          />

          <Input
            type="number"
            value={localExpense.amount}
            onChange={(e) =>
              setLocalExpense({
                ...localExpense,
                amount: Number(e.target.value),
              })
            }
          />

          <Input
            type="date"
            value={localExpense.date}
            onChange={(e) =>
              setLocalExpense({ ...localExpense, date: e.target.value })
            }
          />

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
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
              onClick={() => onStartEditing?.(expense.id)}
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
        </div>
      )}
    </Card>
  );
}
