// src/components/ExpenseForm.tsx
import { useState } from "react";
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
import type { expense } from "@/types/expense";

type ExpenseFormProps = {
  onAddExpense: (expense: expense) => void;
};

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const isFormValid = title && amount && date && category;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) return;

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
    <div>
      <Card
        className={`p-5 w-full max-w-md space-y-4 transition-all duration-300
    ${"shadow-sm"}
  `}
      >
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
            step="1"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (Number(value) < 0) return;
              setAmount(value);
            }}
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
            <SelectContent className="bg-popover text-popover-foreground shadow-lg border z-[9999]">
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="bills">Bills</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ExpenseForm;
