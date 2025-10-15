"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import type { HeroSection } from "@/types/content";

interface HeroSectionEditorProps {
  data: HeroSection;
  onUpdate: (field: string, subfield: string, value: string) => void;
  onSave?: () => void;
}

export function HeroSectionEditor({ data, onUpdate, onSave }: HeroSectionEditorProps) {
  return (
    <SectionEditor title="Hero Section" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdate("content", "title", value)}
        type="textarea"
      />
      <FieldEditor
        label="Description"
        value={data.content.description}
        onChange={(value) => onUpdate("content", "description", value)}
        type="textarea"
      />
      <div className="grid grid-cols-2 gap-4">
        <FieldEditor
          label="Free Trial CTA"
          value={data.cta.freeTrial}
          onChange={(value) => onUpdate("cta", "freeTrial", value)}
        />
        <FieldEditor
          label="Watch Video CTA"
          value={data.cta.watchVideo}
          onChange={(value) => onUpdate("cta", "watchVideo", value)}
        />
      </div>
    </SectionEditor>
  );
}
