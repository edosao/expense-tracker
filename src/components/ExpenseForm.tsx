import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/types/expense";

type ExpenseFormProps = {
  onAddExpense: (expense: Expense) => void;
};

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const isFormValid = title && amount && date && category;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newExpense = {
      id: crypto.randomUUID(),
      title,
      amount: Number(amount),
      date,
      category,
    };

    onAddExpense(newExpense);

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            placeholder="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="bills">Bills</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={!isFormValid}
            >
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
}

export default ExpenseForm;
