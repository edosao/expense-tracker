import { useState } from "react";
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
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

type ExpenseListProps = {
  expenses: Expense[];
  categories: string[];
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
  categories,
  editingId,
  onDeleteExpense,
  onEditExpense,
  onCancelEditing,
  onStartEditing,
}: ExpenseListProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("Newest");

  const sortOptions = ["Newest", "Oldest", "Highest Amount", "Lowest Amount"];

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(exp.category);

    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();

      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      case "Highest Amount":
        return b.amount - a.amount;

      case "Lowest Amount":
        return a.amount - b.amount;

      default:
        return 0;
    }
  });

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
              <Button size="sm" variant="outline" className="h-8 w-10">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              {sortOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={sortBy === option}
                  onCheckedChange={() => setSortBy(option)}
                >
                  <span>{option}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 w-10">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    toggleCategory(category, checked)
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
            {sortedExpenses.map((expenseItem) => (
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
