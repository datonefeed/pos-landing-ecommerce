"use client";

import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import { MediaImageUploader } from "../editors/media-image-uploader";
import type { Header } from "@/types/content";
import media from "@/data/media.json";

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

      <FieldEditor
        label="Logo Alt Text"
        value={data.logo.alt}
        onChange={(value) => onUpdate("logo", "alt", value)}
      />

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Logo Images</h4>
        <MediaImageUploader
          label="Logo White (for dark backgrounds)"
          currentUrl={media.logo.white}
          section="logo"
          field="white"
          onUpload={(url) => {
            console.log("Logo white uploaded:", url);
          }}
          folder="images"
          showPreview={true}
        />
        <MediaImageUploader
          label="Logo Color (for light backgrounds)"
          currentUrl={media.logo.color}
          section="logo"
          field="color"
          onUpload={(url) => {
            console.log("Logo color uploaded:", url);
          }}
          folder="images"
          showPreview={true}
        />
      </div>
    </SectionEditor>
  );
}
