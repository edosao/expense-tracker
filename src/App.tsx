import { useEffect, useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import type { expense } from "./types/expense";

export default function App() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expense, setExpense] = useState<expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses
      ? JSON.parse(storedExpenses)
      : [
          {
            id: crypto.randomUUID(),
            title: "Groceries",
            amount: 70,
            date: "2026-10-25",
            category: "food",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  const handleAddExpense = (newExpense: expense) => {
    setExpense((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpense((prev) => prev.filter((e) => e.id !== id));
  };

  const handleStartEditing = (id: string) => {
    setEditingId(id);
  };

  const handleEditExpense = (updated: expense) => {
    setExpense((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));

    setEditingId(null);
  };

  const handleCancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="col-span-1">
          <ExpenseSummary expenses={expense} />
        </div>
      </main>

      <div className="p-6">
        <ExpenseList
          expense={expense}
          editingId={editingId}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          onStartEditing={handleStartEditing}
          onCancelEditing={handleCancelEditing}
        />
      </div>
    </div>
  );
}
