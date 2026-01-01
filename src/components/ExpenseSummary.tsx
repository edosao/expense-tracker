import { Card } from "@/components/ui/card";
import type { expense } from "@/types/expense";

export default function ExpenseSummary({ expenses }: { expenses: expense[] }) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Summary</h2>

      <div className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</div>

      <div className="space-y-2">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="capitalize">{category}</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
