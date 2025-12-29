import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ExpenseForm />
        </div>
        <div className="col-span-1">
          <ExpenseSummary />
        </div>
      </main>
      <div className="p-6">
        <ExpenseList />
      </div>
    </div>
  );
}
