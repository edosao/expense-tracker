// src/components/ExpenseList.tsx
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Expenses</h2>

      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
    </div>
  );
}
