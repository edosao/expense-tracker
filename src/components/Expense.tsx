import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit, Tag, Plus, X, Pencil, Check } from "lucide-react";
import type { Expense, Note } from "@/types/expense";
import { useState } from "react";

type ExpenseProps = {
  expense: Expense;
  categories: string[];
  onDeleteExpense: (id: string) => void;
  onSaveExpense: (expense: Expense) => void;
};

export default function Expense({
  expense,
  onDeleteExpense,
  onSaveExpense,
  categories,
}: ExpenseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Expense>(expense);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const handleSave = () => {
    onSaveExpense(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(expense);
    setNewNoteContent("");
    setEditingNote(null);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: newNoteContent.trim(),
      expense_id: expense.id,
    };

    setDraft({ ...draft, notes: [...draft.notes, newNote] });
    setNewNoteContent("");
  };

  const handleDeleteNote = (noteId: string) => {
    setDraft({ ...draft, notes: draft.notes.filter((n) => n.id !== noteId) });
  };

  const handleStartEditNote = (note: Note) => {
    setEditingNote({ id: note.id, content: note.content });
  };

  const handleSaveNoteEdit = (noteId: string) => {
    if (!editingNote?.content.trim()) return;

    setDraft({
      ...draft,
      notes: draft.notes.map((n) =>
        n.id === noteId ? { ...n, content: editingNote.content.trim() } : n,
      ),
    });
    setEditingNote(null);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className={`p-4 ${isEditing ? "ring-2 ring-primary bg-muted" : ""}`}
      >
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <Input
              type="number"
              value={draft.amount}
              onChange={(e) =>
                setDraft({ ...draft, amount: Number(e.target.value) })
              }
            />

            <Select
              value={draft.category}
              onValueChange={(value) => setDraft({ ...draft, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="capitalize">{cat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Notes section */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Notes</p>

              <AnimatePresence>
                {draft.notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2"
                  >
                    {editingNote?.id === note.id ? (
                      <>
                        <Input
                          value={editingNote.content}
                          onChange={(e) =>
                            setEditingNote({
                              ...editingNote,
                              content: e.target.value,
                            })
                          }
                          className="h-7 text-sm"
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => handleSaveNoteEdit(note.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => setEditingNote(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="flex-1 text-sm text-muted-foreground">
                          {note.content}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => handleStartEditNote(note)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add new note */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                  className="h-8 text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={handleAddNote}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button size="sm" onClick={handleSave} className="w-full">
                  Save
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full"
                >
                  Cancel
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {expense.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {expense.category} •{" "}
                {new Date(expense.createdAt).toLocaleDateString()}
              </p>

              {expense.notes.length > 0 && (
                <div className="mt-2 flex flex-col flex-wrap gap-1.5">
                  {expense.notes.map((note) => (
                    <span
                      key={note.id}
                      className=" items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {note.content}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">
                ${expense.amount.toFixed(2)}
              </span>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setDraft(expense);
                    setIsEditing(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteExpense(expense.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
