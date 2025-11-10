"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import type { ProductShowcase } from "@/types/content";

interface ProductShowcaseSectionProps {
  data: ProductShowcase;
  onUpdate: (field: string, subfield: string, value: string) => void;
  onSave?: () => void;
}

export function ProductShowcaseSection({ data, onUpdate, onSave }: ProductShowcaseSectionProps) {
  return (
    <SectionEditor title="Product Showcase" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdate("content", "title", value)}
      />
      <FieldEditor
        label="Description"
        value={data.content.description}
        onChange={(value) => onUpdate("content", "description", value)}
        type="textarea"
      />
      <div className="grid grid-cols-2 gap-4">
        <FieldEditor
          label="Video Title"
          value={data.video.title}
          onChange={(value) => onUpdate("video", "title", value)}
        />
        <FieldEditor
          label="Video Description"
          value={data.video.description}
          onChange={(value) => onUpdate("video", "description", value)}
        />
      </div>
    </SectionEditor>
  );
}
