"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveProduct } from "@/features/admin/actions";

export function ProductForm({
  initialData,
  categories,
}: {
  initialData: any;
  categories: any[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        formData.append("id", initialData.id);
      }

      const result = await saveProduct(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(initialData ? "Product updated" : "Product created");
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input name="name" defaultValue={initialData?.name} required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            name="slug"
            defaultValue={initialData?.slug}
            required
            placeholder="unique-product-slug"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>
          <Input name="brand" defaultValue={initialData?.brand} required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            name="categoryId"
            defaultValue={initialData?.categoryId || categories[0]?.id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price (DA)</label>
          <Input
            type="number"
            name="price"
            defaultValue={initialData?.price}
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Discount (%)</label>
          <Input
            type="number"
            name="discount"
            defaultValue={initialData?.discount || 0}
            min="0"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Stock</label>
          <Input
            type="number"
            name="stock"
            defaultValue={initialData?.stock || 0}
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Image URL (JSON array format)
          </label>
          <Input
            name="images"
            defaultValue={
              initialData?.images ||
              '["https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80"]'
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description</label>
        <Textarea
          name="shortDescription"
          defaultValue={initialData?.shortDescription}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Full Description</label>
        <Textarea
          name="fullDescription"
          defaultValue={initialData?.fullDescription}
          required
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Specifications (JSON format)
        </label>
        <Textarea
          name="specifications"
          defaultValue={
            initialData?.specifications ||
            '{"Color": "Black", "Weight": "1.5kg"}'
          }
          required
          className="font-mono text-xs"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
