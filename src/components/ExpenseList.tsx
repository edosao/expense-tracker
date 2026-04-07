import { motion, AnimatePresence } from "framer-motion";
import ExpenseItem from "./ExpenseItem";
import type { Expense } from "@/types/expense";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  categories: string[];
  editingId: string | null;
  selectedCategories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onDeleteExpense?: (id: string) => void;
  onEditExpense?: (expense: Expense) => void;
  onStartEditing: (id: string) => void;
  onCancelEditing: () => void;
  onToggleCategory?: (category: string, checked: boolean) => void;
  filteredExpenses: Expense[];
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
  categories,
  editingId,
  searchQuery,
  selectedCategories,
  onDeleteExpense,
  onEditExpense,
  onCancelEditing,
  onToggleCategory,
  onStartEditing,
  filteredExpenses,
  setSearchQuery,
}: ExpenseListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4 border-b border-muted">
        <h2 className="text-xl font-bold mb-3 pb-2">💰 Expenses</h2>

        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-[180px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="flex items-center justify-center h-8 w-8 rounded-md"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    onToggleCategory?.(category, checked)
                  }
                >
                  <span className="capitalize">{category}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
