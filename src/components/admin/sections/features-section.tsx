"use client";

import { Button } from "@/components/ui/button";
import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import { ArrayEditor } from "../editors/array-editor";
import { MediaImageUploader } from "../editors/media-image-uploader";
import type { FeaturesSection, Feature } from "@/types/content";
import media from "@/data/media.json";

interface FeaturesSectionEditorProps {
  data: FeaturesSection;
  onUpdateContent: (field: string, value: string) => void;
  onUpdateFeatures: (features: Feature[]) => void;
  onSave?: () => void;
}

export function FeaturesSectionEditor({
  data,
  onUpdateContent,
  onUpdateFeatures,
  onSave,
}: FeaturesSectionEditorProps) {
  return (
    <SectionEditor title="Features Section" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdateContent("title", value)}
      />
      <FieldEditor
        label="Description"
        value={data.content.description}
        onChange={(value) => onUpdateContent("description", value)}
        type="textarea"
      />

      <ArrayEditor<Feature>
        label="Features"
        items={data.features}
        onUpdate={onUpdateFeatures}
        createNew={() => ({
          id: String(Date.now()),
          step: "",
          title: "",
          content: "",
          image: "",
        })}
        renderItem={(feature, index, onChange, onDelete) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Feature {index + 1}</h4>
              <Button type="button" onClick={onDelete} variant="destructive" size="sm">
                Xóa
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldEditor
                label="Step"
                value={feature.step}
                onChange={(value) => onChange({ ...feature, step: value })}
              />
              <FieldEditor
                label="Title"
                value={feature.title}
                onChange={(value) => onChange({ ...feature, title: value })}
              />
            </div>
            <FieldEditor
              label="Content"
              value={feature.content}
              onChange={(value) => onChange({ ...feature, content: value })}
              type="textarea"
            />
            <MediaImageUploader
              label="Feature Image"
              currentUrl={
                media.FeaturesSection[feature.id as keyof typeof media.FeaturesSection] ||
                feature.image
              }
              section="FeaturesSection"
              field={feature.id || String(index + 1)}
              onUpload={(url) => onChange({ ...feature, image: url })}
              folder="images"
              showPreview={true}
            />
          </div>
        )}
      />
    </SectionEditor>
  );
}
