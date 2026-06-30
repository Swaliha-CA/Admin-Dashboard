import { useMemo, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, ImagePlus, X, Loader2, Leaf, Drumstick } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMenu, type MenuDraft } from "@/context/MenuContext";
import type { MenuItem } from "@/types";
import { formatINR } from "@/utils/format";
import { cn } from "@/lib/utils";

const CATEGORIES = ["South Indian", "Main Course", "Snacks", "Beverages", "Desserts"];
const MAX_IMAGES = 5;
const ACCEPTED_IMAGE = /^(data:image\/(png|jpe?g|webp);base64,|https?:\/\/.+\.(png|jpe?g|webp)(\?.*)?$)/i;

function isValidImageUrl(url: string) {
  if (url.startsWith("data:image/")) return true;
  try {
    const u = new URL(url);
    return /^https?:$/.test(u.protocol) && /\.(png|jpe?g|webp)(\?.*)?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

interface MenuFormState {
  name: string;
  category: string;
  description: string;
  price: string;
  available: boolean;
  isVeg: boolean;
  images: string[];
}

const emptyForm: MenuFormState = {
  name: "",
  category: CATEGORIES[0],
  description: "",
  price: "",
  available: true,
  isVeg: true,
  images: [],
};

export function MenuPage() {
  const { items, addItem, updateItem, removeItem } = useMenu();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MenuItem | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set([...CATEGORIES, ...items.map((i) => i.category)]))],
    [items],
  );

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (category === "All" || i.category === category) &&
          i.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, category, query],
  );

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menu"
        description="Add, edit, and manage every dish on the canteen menu."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items"
          className="min-w-[220px] flex-1 rounded-2xl bg-card"
        />
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                category === c
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <Button className="rounded-2xl" onClick={openCreate}>
          <Plus className="mr-1.5 h-4 w-4" /> Add item
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Card
            key={m.id}
            className="overflow-hidden border-border shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="relative aspect-[16/10] w-full bg-muted">
              {m.images[0] ? (
                <img
                  src={m.images[0]}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
              <div className="absolute left-3 top-3 flex gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md border bg-background/80 backdrop-blur",
                    m.isVeg ? "border-success/30 text-success" : "border-destructive/30 text-destructive",
                  )}
                >
                  {m.isVeg ? <Leaf className="mr-1 h-3 w-3" /> : <Drumstick className="mr-1 h-3 w-3" />}
                  {m.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
                {!m.available && (
                  <Badge variant="destructive" className="rounded-md">Unavailable</Badge>
                )}
              </div>
            </div>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate font-semibold text-foreground">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.category}</div>
                </div>
                <div className="text-lg font-semibold text-primary">{formatINR(m.price)}</div>
              </div>
              {m.description && (
                <p className="line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
              )}
              <div className="flex items-center justify-end gap-2 pt-1">
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => openEdit(m)}>
                  <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl text-destructive hover:text-destructive"
                  onClick={() => setConfirmDelete(m)}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="border-dashed sm:col-span-2 lg:col-span-3">
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              No menu items match your filters.
            </CardContent>
          </Card>
        )}
      </div>

      <MenuFormDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSubmit={(draft) => {
          if (editing) {
            updateItem(editing.id, draft);
            toast.success("Menu item updated");
          } else {
            addItem(draft);
            toast.success("Menu item added");
          }
        }}
      />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete menu item?</DialogTitle>
            <DialogDescription>
              This will remove "{confirmDelete?.name}" from the menu. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  removeItem(confirmDelete.id);
                  toast.success("Item deleted");
                }
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MenuFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: MenuItem | null;
  onSubmit: (draft: MenuDraft) => void;
}

function MenuFormDialog({ open, onOpenChange, editing, onSubmit }: MenuFormDialogProps) {
  const initial: MenuFormState = editing
    ? {
        name: editing.name,
        category: editing.category,
        description: editing.description,
        price: String(editing.price),
        available: editing.available,
        isVeg: editing.isVeg,
        images: editing.images,
      }
    : emptyForm;

  const [form, setForm] = useState<MenuFormState>(initial);
  const [urlInput, setUrlInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Reset whenever dialog opens with a different editing target.
  useMemo(() => {
    if (open) {
      setForm(initial);
      setUrlInput("");
      setErrors({});
      setSaving(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editing?.id]);

  const update = <K extends keyof MenuFormState>(key: K, value: MenuFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (file: File) => {
    if (form.images.length >= MAX_IMAGES) {
      toast.error(`Up to ${MAX_IMAGES} images allowed`);
      return;
    }
    if (!/\.(png|jpe?g|webp)$/i.test(file.name)) {
      toast.error("Only jpg, jpeg, png, webp are allowed");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result ?? "");
      if (!ACCEPTED_IMAGE.test(data)) {
        toast.error("Invalid image file");
        return;
      }
      update("images", [...form.images, data]);
    };
    reader.readAsDataURL(file);
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!isValidImageUrl(url)) {
      setErrors((e) => ({ ...e, url: "Enter a valid image URL (jpg, png, webp)" }));
      return;
    }
    if (form.images.length >= MAX_IMAGES) {
      toast.error(`Up to ${MAX_IMAGES} images allowed`);
      return;
    }
    update("images", [...form.images, url]);
    setUrlInput("");
    setErrors((e) => ({ ...e, url: "" }));
  };

  const removeImage = (idx: number) =>
    update("images", form.images.filter((_, i) => i !== idx));

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.category.trim()) next.category = "Category is required";
    const priceNum = Number(form.price);
    if (!form.price.trim() || Number.isNaN(priceNum) || priceNum <= 0) {
      next.price = "Enter a valid price";
    }
    if (form.images.length === 0) next.images = "At least one image is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!validate()) return;
    setSaving(true);
    try {
      // Simulate async save for UX consistency.
      await new Promise((res) => setTimeout(res, 350));
      onSubmit({
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        available: form.available,
        isVeg: form.isVeg,
        images: form.images,
      });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit menu item" : "Add menu item"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update details — changes apply instantly." : "Fill in details to add a new dish."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Masala Dosa"
                maxLength={80}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="A short description"
              rows={3}
              maxLength={300}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                inputMode="decimal"
                min={1}
                step="1"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="e.g. 120"
              />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-border p-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="available" className="text-sm">Available</Label>
                <Switch
                  id="available"
                  checked={form.available}
                  onCheckedChange={(v) => update("available", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isVeg" className="text-sm">Vegetarian</Label>
                <Switch
                  id="isVeg"
                  checked={form.isVeg}
                  onCheckedChange={(v) => update("isVeg", v)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Images * (up to {MAX_IMAGES})</Label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {form.images.map((src, idx) => (
                  <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                    <img src={src} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      aria-label="Remove image"
                      className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-destructive opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card px-3 py-3 text-sm text-muted-foreground hover:bg-accent">
                <ImagePlus className="h-4 w-4" />
                Upload image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = "";
                  }}
                />
              </label>
              <div className="flex gap-2">
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste image URL (https://…)"
                  aria-label="Image URL"
                />
                <Button type="button" variant="outline" onClick={addUrl}>Add</Button>
              </div>
            </div>
            {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
            {errors.images && <p className="text-xs text-destructive">{errors.images}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : editing ? (
                "Save changes"
              ) : (
                "Add item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
