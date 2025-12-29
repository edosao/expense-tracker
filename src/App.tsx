import { useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import type { expense } from "./types/expense";

export default function App() {
  const [expense, setExpense] = useState<expense[]>([
    {
      // TODO: fill in the type fields
      title: "Groceries",
      amount: Number(70),
      date: "10-25-2026",
      category: "food",
    },
  ]);

  const handleAddExpense = (newExpense: expense) => {
    setExpense((prev) => [...prev, newExpense]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="col-span-1">
          <ExpenseSummary />
        </div>
      </main>
      <div className="p-6">
        <ExpenseList expense={expense} />
      </div>
    </div>
  );
}
