"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FieldEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "input" | "textarea";
  placeholder?: string;
}

export function FieldEditor({
  label,
  value,
  onChange,
  type = "input",
  placeholder,
}: FieldEditorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <Input
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
