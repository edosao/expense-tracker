import { useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import type { expense } from "./types/expense";

export default function App() {
  const [editingExpense, setEditingExpense] = useState<expense | null>(null);
  const [expense, setExpense] = useState<expense[]>([
    {
      id: crypto.randomUUID(),
      title: "Groceries",
      amount: Number(70),
      date: "2026-10-25",
      category: "food",
    },
  ]);

  const handleAddExpense = (newExpense: expense) => {
    if (editingExpense) {
      // edit existing
      setExpense((prev) =>
        prev.map((exp) => (exp.id === newExpense.id ? newExpense : exp))
      );
      setEditingExpense(null); // reset edit mode
    } else {
      // add new
      setExpense((prev) => [...prev, newExpense]);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpense((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (expenseToEdit: expense) => {
    setEditingExpense(expenseToEdit);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ExpenseForm
            editingExpense={editingExpense}
            onAddExpense={handleAddExpense}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className="col-span-1">
          <ExpenseSummary />
        </div>
      </main>
      <div className="p-6">
        <ExpenseList
          expense={expense}
          editingExpense={editingExpense}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </div>
    </div>
  );
}
