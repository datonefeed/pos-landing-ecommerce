"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import type { Header } from "@/types/content";

interface HeaderSectionProps {
  data: Header;
  onUpdate: (field: string, subfield: string, value: string) => void;
  onSave?: () => void;
}

export function HeaderSection({ data, onUpdate, onSave }: HeaderSectionProps) {
  return (
    <SectionEditor title="Header" onSave={onSave}>
      <div className="grid grid-cols-2 gap-4">
        <FieldEditor
          label="Features Nav"
          value={data.nav.features}
          onChange={(value) => onUpdate("nav", "features", value)}
        />
        <FieldEditor
          label="Pricing Nav"
          value={data.nav.pricing}
          onChange={(value) => onUpdate("nav", "pricing", value)}
        />
        <FieldEditor
          label="Solutions Nav"
          value={data.nav.solutions}
          onChange={(value) => onUpdate("nav", "solutions", value)}
        />
        <FieldEditor
          label="Support Nav"
          value={data.nav.support}
          onChange={(value) => onUpdate("nav", "support", value)}
        />
        <FieldEditor
          label="News Nav"
          value={data.nav.news}
          onChange={(value) => onUpdate("nav", "news", value)}
        />
        <FieldEditor
          label="About Us Nav"
          value={data.nav.aboutUs}
          onChange={(value) => onUpdate("nav", "aboutUs", value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FieldEditor
          label="Sign Up CTA"
          value={data.cta.signUp}
          onChange={(value) => onUpdate("cta", "signUp", value)}
        />
        <FieldEditor
          label="Sign In CTA"
          value={data.cta.signIn}
          onChange={(value) => onUpdate("cta", "signIn", value)}
        />
      </div>
    </SectionEditor>
  );
}
