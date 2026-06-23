import type { Expense } from "@/types/expense";
import StatsStrip from "./StatsStrip";
import SummaryPanel from "./SummaryPanel";
import Expenses from "./Expenses";

type DashboardProps = {
  filteredExpenses: Expense[];
  expenses: Expense[];
  categories: string[];
  selectedMonth: string;
  selectedCategories: string[];
  searchQuery: string;
  chartData: { category: string; amount: number }[];
  onExpensesChange: (expenses: Expense[]) => void;
  onToggleCategory: (category: string, checked: boolean) => void;
  onSelectedMonth: (month: string) => void;
  setSearchQuery: (query: string) => void;
};

export default function Dashboard({
  filteredExpenses,
  expenses,
  categories,
  selectedMonth,
  selectedCategories,
  searchQuery,
  chartData,
  onExpensesChange,
  onToggleCategory,
  onSelectedMonth,
  setSearchQuery,
}: DashboardProps) {
  return (
    <div className="space-y-6">
      <StatsStrip
        filteredExpenses={filteredExpenses}
        categories={categories}
        selectedMonth={selectedMonth}
      />

      <SummaryPanel
        filteredExpenses={filteredExpenses}
        categories={categories}
        selectedMonth={selectedMonth}
        chartData={chartData}
      />

      <Expenses
        expenses={expenses}
        onExpensesChange={onExpensesChange}
        onToggleCategory={onToggleCategory}
        categories={categories}
        selectedCategories={selectedCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredExpenses={filteredExpenses}
        selectedMonth={selectedMonth}
        onSelectedMonth={onSelectedMonth}
      />
    </div>
  );
}
