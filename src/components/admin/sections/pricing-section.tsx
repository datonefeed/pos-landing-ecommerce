"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import { ArrayEditor } from "../editors/array-editor";
import type { PricingSection, Plan } from "@/types/content";

interface PricingSectionEditorProps {
  data: PricingSection;
  onUpdateContent: (field: string, value: string) => void;
  onUpdatePlans: (plans: Plan[]) => void;
  onSave?: () => void;
}

export function PricingSectionEditor({
  data,
  onUpdateContent,
  onUpdatePlans,
  onSave,
}: PricingSectionEditorProps) {
  return (
    <SectionEditor title="Pricing Section" onSave={onSave}>
      <FieldEditor
        label="Title"
        value={data.content.title}
        onChange={(value) => onUpdateContent("title", value)}
      />

      <ArrayEditor<Plan>
        label="Pricing Plans"
        items={data.plans}
        onUpdate={onUpdatePlans}
        createNew={() => ({
          name: "",
          subtitle: "",
          period: "",
          price: "",
          originalPrice: "",
          features: [],
          highlighted: false,
        })}
        renderItem={(plan, index, onChange, onDelete) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Plan {index + 1}</h4>
              <Button type="button" onClick={onDelete} variant="destructive" size="sm">
                Xóa
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldEditor
                label="Name"
                value={plan.name}
                onChange={(value) => onChange({ ...plan, name: value })}
              />
              <FieldEditor
                label="Subtitle"
                value={plan.subtitle}
                onChange={(value) => onChange({ ...plan, subtitle: value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FieldEditor
                label="Period"
                value={plan.period}
                onChange={(value) => onChange({ ...plan, period: value })}
              />
              <FieldEditor
                label="Price"
                value={plan.price}
                onChange={(value) => onChange({ ...plan, price: value })}
              />
              <FieldEditor
                label="Original Price"
                value={plan.originalPrice}
                onChange={(value) => onChange({ ...plan, originalPrice: value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Highlighted</Label>
              <input
                type="checkbox"
                checked={plan.highlighted}
                onChange={(e) => onChange({ ...plan, highlighted: e.target.checked })}
                className="rounded"
              />
            </div>
            <ArrayEditor<string>
              label="Features"
              items={plan.features}
              onUpdate={(features) => onChange({ ...plan, features })}
              createNew={() => ""}
              renderItem={(feature, featureIndex, onFeatureChange, onFeatureDelete) => (
                <div key={featureIndex} className="flex gap-2 items-center">
                  <Input
                    value={feature}
                    onChange={(e) => onFeatureChange(e.target.value)}
                    placeholder="Feature description"
                  />
                  <Button type="button" onClick={onFeatureDelete} variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              )}
            />
          </div>
        )}
      />
    </SectionEditor>
  );
}
