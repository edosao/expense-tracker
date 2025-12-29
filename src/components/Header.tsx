// src/components/Header.tsx
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="flex justify-between items-center p-6 bg-card shadow-md">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <Button variant="outline" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </header>
  );
}
