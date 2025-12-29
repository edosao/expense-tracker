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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
      // TODO: fill in the type fields
      title,
      amount: Number(amount),
      date,
      category,
    };

    onAddExpense(newExpense);

    // reset form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <Card className="p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold">Add / Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Amount"
          type="number"
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

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Add Expense
          </Button>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ExpenseForm;
