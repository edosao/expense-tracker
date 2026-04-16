import { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import CategoryManager from "./components/CategoryManager";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import type { ActiveTab, Expense } from "./types/expense";
import { fetchExpensesFromLocalStorage, storeInLocalStorage } from "./utils/expense";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem("categories");

    const base = storedCategories
      ? JSON.parse(storedCategories)
      : ["food", "transport", "bills", "entertainment"];

    return base.includes("other") ? base : [...base, "other"];
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>(fetchExpensesFromLocalStorage);

  useEffect(() => {
    storeInLocalStorage("categories", categories)
  }, [categories]);

  useEffect(() => {
    storeInLocalStorage("expenses", expenses)
  }, [expenses]);

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
    if (category === "other") return;

    setCategories((prev) => prev.filter((c) => c !== category));

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.category === category
          ? { ...expense, category: "other" }
          : expense,
      ),
    );
  };

  const handleEditCategory = (oldCategory: string, newCategory: string) => {
    if (oldCategory === "other") return;

    const formattedCategory = newCategory.trim().toLowerCase();

    if (!formattedCategory || formattedCategory === "other") return;

    setCategories((prev) =>
      prev.map((c) => (c === oldCategory ? formattedCategory : c)),
    );

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.category === oldCategory
          ? { ...expense, category: formattedCategory }
          : expense,
      ),
    );
  };

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(exp.category);

    return matchesSearch && matchesCategory;
  });

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
                <ExpenseSummary
                  filteredExpenses={filteredExpenses}
                  categories={categories}
                />
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
              onToggleCategory={toggleCategory}
              categories={categories}
              selectedCategories={selectedCategories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredExpenses={filteredExpenses}
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
