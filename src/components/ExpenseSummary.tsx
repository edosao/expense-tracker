// src/components/ExpenseSummary.tsx
import { Card } from "@/components/ui/card";

export default function ExpenseSummary() {
  return (
    <Card className="p-6 w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <p className="text-2xl font-bold">$0.00</p>
      <p className="text-sm text-muted-foreground">Total Expenses</p>
    </Card>
  );
}
