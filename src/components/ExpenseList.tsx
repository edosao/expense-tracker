import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseItem from "./ExpenseItem";
import type { Expense } from "@/types/expense";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

type ExpenseListProps = {
  expenses: Expense[];
  editingId: string | null;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: Expense) => void;
  onStartEditing: (id: string) => void;
  onCancelEditing: () => void;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ExpenseList({
  expenses,
  editingId,
  onDeleteExpense,
  onEditExpense,
  onCancelEditing,
  onStartEditing,
}: ExpenseListProps) {
  const categories = ["food", "transport", "bills", "entertainment"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  const filteredExpenses =
    selectedCategories.length === 0
      ? expenses
      : expenses.filter((exp) => selectedCategories.includes(exp.category));

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4 border-b border-muted">
        <h2 className="text-xl font-bold mb-3 pb-2">💰 Expenses</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="mr-6 mb-4">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => toggleCategory(category, checked)}
              >
                <span className="capitalize">{category}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredExpenses.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-4 text-center text-muted-foreground">
            No expenses added yet.
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredExpenses.map((expenseItem) => (
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
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
