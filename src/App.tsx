import { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import CategoryManager from "./components/CategoryManager";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import type { Expense } from "./types/expense";

export default function App() {
  const [activeTab, setActiveTab] = useState<"expenses" | "categories">(
    "expenses",
  );

  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories
      ? JSON.parse(storedCategories)
      : ["food", "transport", "bills", "entertainment"];
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");

    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses, categories]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleStartEditing = (id: string) => {
    setEditingId(id);
  };

  const handleEditExpense = (updated: Expense) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingId(null);
  };

  const handleCancelEditing = () => {
    setEditingId(null);
  };

  const handleAddCategory = (category: string) => {
    if (categories.includes(category.toLowerCase())) {
      return false;
    }

    setCategories([...categories, category.toLowerCase()]);
    return true;
  };

  const handleDeleteCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));

    setExpenses((prev) =>
      prev.filter((expense) => expense.category !== category),
    );
  };

  const handleEditCategory = (oldCategory: string, newCategory: string) => {
    setCategories((prev) =>
      prev.map((c) => (c === oldCategory ? newCategory : c)),
    );

    setExpenses((prev) =>
      prev.filter((expense) => expense.category !== oldCategory),
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "expenses" && (
        <>
          <main className="p-6 flex flex-col-reverse md:flex-row md:justify-evenly items-center gap-6">
            <div className="w-full flex-1 max-w-[400px]">
              <Card className="p-6 space-y-4">
                <ExpenseForm
                  onAddExpense={handleAddExpense}
                  categories={categories}
                />
              </Card>
            </div>

            <div className="flex-1 w-full max-w-[400px] mt-3">
              {categories.length > 0 && (
                <ExpenseSummary expenses={expenses} categories={categories} />
              )}
            </div>
          </main>

          <div className="p-6">
            <ExpenseList
              expenses={expenses}
              editingId={editingId}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={handleEditExpense}
              onStartEditing={handleStartEditing}
              onCancelEditing={handleCancelEditing}
              categories={categories}
            />
          </div>
        </>
      )}

      {activeTab === "categories" && (
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onEditCategory={handleEditCategory}
        />
      )}
    </div>
  );
}
