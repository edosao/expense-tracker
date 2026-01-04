import { Card } from "@/components/ui/card";
import type { expense } from "@/types/expense";
import { BarChart3, Utensils, Car, Receipt, Clapperboard } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="h-4 w-4" />,
  transport: <Car className="h-4 w-4" />,
  bills: <Receipt className="h-4 w-4" />,
  entertainment: <Clapperboard className="h-4 w-4" />,
};

export default function ExpenseSummary({ expenses }: { expenses: expense[] }) {
  const categories = ["food", "transport", "bills", "entertainment"];

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const allCategoryTotals = categories.reduce((acc, category) => {
    acc[category] = categoryTotals[category] || 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Summary</h2>
      </div>

      {/* Total */}
      <div className="rounded-lg bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">Total Spending</p>
        <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {Object.entries(allCategoryTotals).map(([category, amount]) => (
          <div
            key={category}
            className="flex items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {categoryIcons[category]}
              </span>
              <span className="capitalize">{category}</span>
            </div>

            <span
              className={amount === 0 ? "text-muted-foreground" : "font-medium"}
            >
              ${amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
