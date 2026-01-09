import { useState, useEffect, useRef } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

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
  const categories = ["food", "transport", "bills", "entertainment"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const expenseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (expenses.length === 0) return;
    const lastExpense = expenses[expenses.length - 1];
    expenseRefs.current[lastExpense.id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [expenses]);

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const filteredExpenses =
    selectedCategories.length === 0
      ? expenses
      : expenses.filter((exp) => selectedCategories.includes(exp.category));

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4 border-b border-muted">
        <h2 className="text-xl font-bold mb-3 pb-2 flex items-center gap-2">
          💰Expenses
        </h2>
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
        <Card className="p-4 text-center text-muted-foreground">
          No expenses added yet.
        </Card>
      ) : (
        <motion.div className="space-y-4">
          <AnimatePresence>
            {filteredExpenses.map((expenseItem) => (
              <motion.div
                key={expenseItem.id}
                ref={(el) => {
                  expenseRefs.current[expenseItem.id] = el;
                }}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <ExpenseItem
                  key={expenseItem.id}
                  expense={expenseItem}
                  editingId={editingId}
                  onDeleteExpense={onDeleteExpense}
                  onSaveExpense={onEditExpense}
                  onStartEditing={onStartEditing}
                  onCancelEditing={onCancelEditing}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
