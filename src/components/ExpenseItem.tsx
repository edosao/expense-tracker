import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Tag } from "lucide-react";
import type { Expense } from "@/types/expense";

type ExpenseItemProps = {
  expense: Expense;
  editingId: string | null;
  onDeleteExpense?: (id: string) => void;
  onSaveExpense?: (expense: Expense) => void;
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
    setLocalExpense(expense);
    onCancelEditing();
  };

  return (
    <Card
      className={`p-4 transition-all duration-300 ${
        editingId === expense.id
          ? "ring-2 ring-primary bg-muted scale-[1.01]"
          : "hover:shadow-sm"
      }`}
    >
      {editingId === expense.id ? (
        <div className="space-y-3">
          <Input
            value={localExpense.title}
            onChange={(e) =>
              setLocalExpense({ ...localExpense, title: e.target.value })
            }
            placeholder="Title"
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
            placeholder="Amount"
            min={0}
          />

          <Input
            type="date"
            value={localExpense.date}
            onChange={(e) =>
              setLocalExpense({ ...localExpense, date: e.target.value })
            }
          />

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="flex-1">
              <Edit className="w-4 h-4 mr-1" /> Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {expense.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {expense.category} • {expense.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">${expense.amount.toFixed(2)}</span>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onStartEditing(expense.id)}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeleteExpense?.(expense.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
