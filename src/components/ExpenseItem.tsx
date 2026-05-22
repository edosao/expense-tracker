import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit, Tag } from "lucide-react";
import type { Expense } from "@/types/expense";
import { useState } from "react";

type ExpenseItemProps = {
  expense: Expense;
  categories: string[];
  onDeleteExpense?: (id: string) => void;
  onSaveExpense?: (expense: Expense) => void;
};

export default function ExpenseItem({
  expense,
  onDeleteExpense,
  onSaveExpense,
  categories,
}: ExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Expense>(expense);

  const handleSave = () => {
    onSaveExpense?.(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(expense);
    setIsEditing(false);
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
        className={`p-4 ${isEditing ? "ring-2 ring-primary bg-muted" : ""}`}
      >
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <Input
              type="number"
              value={draft.amount}
              onChange={(e) =>
                setDraft({ ...draft, amount: Number(e.target.value) })
              }
            />

            <Select
              value={draft.category}
              onValueChange={(value) => setDraft({ ...draft, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="capitalize">{cat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                {expense.category} •{" "}
                {new Date(expense.createdAt).toLocaleDateString()}
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
                  onClick={() => setIsEditing(true)}
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
