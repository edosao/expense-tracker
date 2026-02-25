import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className={`p-4 ${
          editingId === expense.id ? "ring-2 ring-primary bg-muted" : ""
        }`}
      >
        {editingId === expense.id ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
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
              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button size="sm" onClick={handleSave} className="w-full">
                  Save
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full"
                >
                  Cancel
                </Button>
              </motion.div>
            </div>
          </motion.div>
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
              <span className="font-semibold">
                ${expense.amount.toFixed(2)}
              </span>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStartEditing(expense.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteExpense?.(expense.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
