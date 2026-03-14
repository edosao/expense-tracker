import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2Icon, Check, X } from "lucide-react";

type CategoryListProps = {
  categories: string[];
  onDeleteCategory: (category: string) => void;
  onEditCategory: (oldCategory: string, newCategory: string) => void;
};

const CategoryList = ({
  categories,
  onDeleteCategory,
  onEditCategory,
}: CategoryListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState(""); // New state for input

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setEditedValue(cat);
  };

  const handleDeleteCategory = (cat: string) => {
    onDeleteCategory(cat);
  };

  const handleSaveEdit = () => {
    if (!editedValue.trim() || !selectedCategory) return;

    onEditCategory(selectedCategory, editedValue.trim());

    setSelectedCategory(null);
    setEditedValue("");
  };

  const handleCancelEdit = () => {
    setSelectedCategory(null);
    setEditedValue("");
  };

  return (
    <div>
      {categories.map((cat) => (
        <div
          key={cat}
          className="flex justify-between items-center border rounded-md p-2 mb-2"
        >
          {selectedCategory !== cat && !isEditing ? (
            <>
              <span className="capitalize">{cat}</span>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleSelectCategory(cat)}
                >
                  <Edit2Icon className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteCategory(cat)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Input
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="max-w-[150px]"
              />

              <div className="flex gap-2">
                <Button size="icon" variant="default" onClick={handleSaveEdit}>
                  <Check className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    handleCancelEdit();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
