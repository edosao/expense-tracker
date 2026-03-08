import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CategoryManager({
  categories,
  onAddCategory,
}: {
  categories: string[];
  onAddCategory: (category: string) => void | boolean;
}) {
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md p-6 space-y-5">
        <h2 className="text-lg font-semibold">Manage Categories</h2>

        <div className="flex gap-2">
          <Input
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            onClick={() => {
              const trimmed = newCategory.trim().toLowerCase();

              if (!trimmed) return;

              const success = onAddCategory(trimmed);

              if (!success) {
                setError("Category already exists");
                return;
              }

              setError("");
              setNewCategory("");
            }}
          >
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat}
              className="flex justify-between items-center border rounded-md p-2"
            >
              <span className="capitalize">{cat}</span>

              <Button size="icon" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {/* <div className="flex justify-between items-center border rounded-md p-2">
            <span className="capitalize">transport</span>

            <Button size="icon" variant="destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div> */}
        </div>
      </Card>
    </div>
  );
}
