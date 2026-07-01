import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { Expense, INote } from "@/types/expense";

type AddExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddExpense: (expense: Expense) => void;
  categories: string[];
};

const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

export default function AddExpenseDialog({
  open,
  onClose,
  onAddExpense,
  categories = [],
}: AddExpenseDialogProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(getTodayDateString());
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || amount <= 0 || !date) {
      setError("Please fill all fields including category");
      return;
    }

    const expenseId = crypto.randomUUID();

    const notes: INote[] = noteContent.trim()
      ? [
          {
            id: crypto.randomUUID(),
            content: noteContent.trim(),
            expense_id: expenseId,
          },
        ]
      : [];

    const newExpense: Expense = {
      id: expenseId,
      title,
      amount,
      createdAt: new Date(date).getTime(),
      category,
      notes,
    };

    onAddExpense(newExpense);
    setTitle("");
    setAmount(0);
    setCategory("");
    setDate(getTodayDateString());
    setNoteContent("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setAmount(0);
    setCategory("");
    setDate(getTodayDateString());
    setNoteContent("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Amount"
            type="number"
            min="0"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Add a note (optional)"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="w-full gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
