import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import CategoryManager from "./components/CategoryManager";
import AddExpenseDialog from "./components/AddExpenseDialog";
import FAB from "./components/FAB";
import Dashboard from "./components/Dashboard";
import type { ActiveTab, Expense } from "./types/expense";
import {
  fetchExpensesFromLocalStorage,
  storeInLocalStorage,
  getTotalByCategory,
} from "./utils/expense";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem("categories");
    const base = storedCategories
      ? JSON.parse(storedCategories)
      : ["food", "transport", "bills", "entertainment"];
    return base.includes("other") ? base : [...base, "other"];
  });

  const [expenses, setExpenses] = useState<Expense[]>(
    fetchExpensesFromLocalStorage,
  );

  useEffect(() => {
    storeInLocalStorage("categories", categories);
  }, [categories]);

  const handleAddExpense = (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleExpensesChange = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleAddCategory = (category: string) => {
    if (categories.includes(category.toLowerCase())) return false;
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

  const toMonthKey = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const matchesMonth = (exp: Expense) => {
    if (selectedMonth === "all") return true;
    return toMonthKey(exp.createdAt) === selectedMonth;
  };

  const matchesSearch = (exp: Expense) =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory = (exp: Expense) =>
    selectedCategories.length === 0 ||
    selectedCategories.includes(exp.category);

  // For the list — includes search
  const filteredExpenses = expenses.filter(
    (exp) => matchesMonth(exp) && matchesSearch(exp) && matchesCategory(exp),
  );

  // For the summary — excludes search so totals are not affected by search
  const summaryExpenses = expenses.filter(
    (exp) => matchesMonth(exp) && matchesCategory(exp),
  );

  const chartData = categories.map((category) => ({
    category,
    amount: getTotalByCategory(summaryExpenses, category),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "expenses" && (
        <>
          <div className="max-w-5xl mx-auto px-4 py-6">
            <Dashboard
              filteredExpenses={filteredExpenses}
              summaryExpenses={summaryExpenses}
              expenses={expenses}
              categories={categories}
              selectedMonth={selectedMonth}
              selectedCategories={selectedCategories}
              searchQuery={searchQuery}
              chartData={chartData}
              onExpensesChange={handleExpensesChange}
              onToggleCategory={toggleCategory}
              onSelectedMonth={setSelectedMonth}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <FAB onClick={() => setShowAddExpense(true)} />

          <AddExpenseDialog
            open={showAddExpense}
            onClose={() => setShowAddExpense(false)}
            onAddExpense={handleAddExpense}
            categories={categories}
          />
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
