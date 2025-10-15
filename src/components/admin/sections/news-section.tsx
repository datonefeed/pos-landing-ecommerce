"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import type { NewsSection } from "@/types/content";

interface NewsSectionEditorProps {
  data: NewsSection;
  onUpdate: (field: string, subfield: string, value: string) => void;
  onSave?: () => void;
}

export function NewsSectionEditor({ data, onUpdate, onSave }: NewsSectionEditorProps) {
  return (
    <SectionEditor title="News Section" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdate("content", "title", value)}
      />
      <FieldEditor
        label="Read More CTA"
        value={data.cta.readMore}
        onChange={(value) => onUpdate("cta", "readMore", value)}
      />
    </SectionEditor>
  );
}
