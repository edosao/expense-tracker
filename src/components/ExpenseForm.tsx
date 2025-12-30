// src/components/ExpenseForm.tsx
import { useState, useEffect } from "react";
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
  editingExpense?: expense | null;
  onCancelEdit: () => void;
};

function ExpenseForm({
  onAddExpense,
  editingExpense,
  onCancelEdit,
}: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
      setCategory(editingExpense.category);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
      // TODO: fill in the type fields
      id: editingExpense ? editingExpense.id : crypto.randomUUID(),
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
      <h2 className="text-lg font-semibold">
        {editingExpense ? "Editing Expense" : "Add Expense"}
      </h2>

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
            {editingExpense ? "Save Changes" : "Add Expense"}
          </Button>
          {editingExpense && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancelEdit}
              className="flex-1"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default ExpenseForm;
