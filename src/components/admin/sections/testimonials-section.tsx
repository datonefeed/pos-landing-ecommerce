"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import type { TestimonialsSection } from "@/types/content";

interface TestimonialsSectionEditorProps {
  data: TestimonialsSection;
  onUpdate: (field: string, value: string) => void;
  onSave?: () => void;
}

export function TestimonialsSectionEditor({
  data,
  onUpdate,
  onSave,
}: TestimonialsSectionEditorProps) {
  return (
    <SectionEditor title="Testimonials Section" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdate("title", value)}
      />
      <FieldEditor
        label="Description"
        value={data.content.description}
        onChange={(value) => onUpdate("description", value)}
        type="textarea"
      />
    </SectionEditor>
  );
}
