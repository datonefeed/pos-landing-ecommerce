"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ArrayEditorProps<T> {
  label: string;
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    onChange: (item: T) => void,
    onDelete: () => void
  ) => React.ReactNode;
  createNew: () => T;
}

export function ArrayEditor<T>({
  label,
  items,
  onUpdate,
  renderItem,
  createNew,
}: ArrayEditorProps<T>) {
  const handleItemChange = (index: number, newItem: T) => {
    const newItems = [...items];
    newItems[index] = newItem;
    onUpdate(newItems);
  };

  const handleAddItem = () => {
    onUpdate([...items, createNew()]);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <Button type="button" onClick={handleAddItem} size="sm">
          Thêm mới
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) =>
          renderItem(
            item,
            index,
            (newItem) => handleItemChange(index, newItem),
            () => handleDeleteItem(index)
          )
        )}
      </div>
    </div>
  );
}
