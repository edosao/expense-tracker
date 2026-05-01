import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import type { Expense } from "@/types/expense";
import { BarChart3, Utensils, Car, Receipt, Clapperboard } from "lucide-react";
import { getTotalByCategory, getTotalExpenses } from "@/utils/expense";

const categoryIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="h-4 w-4" />,
  transport: <Car className="h-4 w-4" />,
  bills: <Receipt className="h-4 w-4" />,
  entertainment: <Clapperboard className="h-4 w-4" />,
};

export default function ExpenseSummary({
  filteredExpenses,
  categories,
  selectedMonth,
}: {
  filteredExpenses: Expense[];
  categories: string[];
  selectedMonth: string;
}) {
  const budgetLimit = {
    food: 1000,
    transport: 500,
    bills: 800,
    entertainment: 300,
    other: 1000,
  };

  const currentMonth =
    selectedMonth === "all"
      ? new Date().toISOString().slice(0, 7)
      : selectedMonth;

  const [allMonthBudgets, setAllMonthBudgets] = useState<
    Record<string, Record<string, number>>
  >(() => {
    const stored = localStorage.getItem("monthlyBudgets");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("monthlyBudgets", JSON.stringify(allMonthBudgets));
  }, [allMonthBudgets]);

  // Get the budget for the current month, falling back to defaults
  const budgets = allMonthBudgets[currentMonth] ?? budgetLimit;

  const updateBudget = (category: string, value: number) => {
    setAllMonthBudgets((prev) => ({
      ...prev,
      [currentMonth]: {
        ...(prev[currentMonth] ?? budgetLimit),
        [category]: value,
      },
    }));
  };

  const totalAmount = getTotalExpenses(filteredExpenses);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const isOverTotalBudget =
    selectedMonth !== "all" && totalAmount > totalBudget;

  const allCategoryTotals = categories.reduce(
    (acc, category) => {
      acc[category] = getTotalByCategory(filteredExpenses, category);
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Card className="p-6 space-y-5 max-h-[340px] my-auto overflow-y-auto">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Summary</h2>
        <span className="ml-auto text-xs text-muted-foreground">
          {selectedMonth !== "all" ? currentMonth : "All Time"}
        </span>
      </div>

      {/* Total Spending */}
      <div className="rounded-lg bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">
          {selectedMonth !== "all"
            ? "Total Monthly Spending"
            : "Total Spending"}
        </p>
        <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
      </div>

      {/* Budget vs Actual */}
      {selectedMonth !== "all" && (
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Budget</span>
            <span className="font-medium">${totalBudget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Spent</span>
            <span
              className={`font-medium ${isOverTotalBudget ? "text-destructive" : ""}`}
            >
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isOverTotalBudget ? "bg-destructive" : "bg-primary"
              }`}
              style={{
                width: `${Math.min(
                  (totalAmount / (totalBudget || 1)) * 100,
                  100,
                )}%`,
              }}
            />
          </div>
          {isOverTotalBudget && (
            <p className="text-xs text-destructive">
              ⚠️ You have exceeded your total budget by $
              {(totalAmount - totalBudget).toFixed(2)}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {Object.entries(allCategoryTotals).map(([category, amount]) => {
          const isOverBudget =
            selectedMonth !== "all" && amount > (budgets[category] ?? 0);
          return (
            <div
              key={category}
              className="space-y-1 border-b border-muted pb-2 last:border-0"
            >
              <div className="flex items-center justify-between rounded-md px-2 py-1 text-muted-foreground hover:bg-muted">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {categoryIcons[category] ?? (
                      <BarChart3 className="h-4 w-4" />
                    )}
                  </span>
                  <span className="capitalize">{category}</span>
                </div>

                <span
                  className={`${
                    amount === 0
                      ? "text-muted-foreground"
                      : isOverBudget
                        ? "text-destructive font-medium"
                        : "font-medium"
                  }`}
                >
                  ${amount.toFixed(2)}
                </span>
              </div>

              {selectedMonth !== "all" && (
                <div className="flex items-center gap-2 px-2 pb-1 text-xs text-muted-foreground">
                  <span>Budget limit:</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={budgets[category] ?? ""}
                    onChange={(e) =>
                      updateBudget(category, Number(e.target.value))
                    }
                    className="w-24 rounded border border-input bg-background px-2 py-0.5 text-xs focus:outline-none"
                  />
                </div>
              )}

              {selectedMonth !== "all" && isOverBudget && (
                <p className="px-2 text-xs text-destructive">
                  ⚠️ You have exceeded your budget for {category} by $
                  {(amount - (budgets[category] ?? 0)).toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
