"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionEditor } from "../editors/section-editor";
import { FieldEditor } from "../editors/field-editor";
import { ArrayEditor } from "../editors/array-editor";
import type { Footer, FooterLink } from "@/types/content";

interface FooterSectionEditorProps {
  data: Footer;
  onUpdateCompany: (field: string, value: string) => void;
  onUpdateLinks: (section: string, field: string, value: FooterLink[]) => void;
  onUpdateNewsletter: (field: string, value: string) => void;
  onUpdateBottom: (field: string, value: string | object) => void;
  onSave?: () => void;
}

export function FooterSectionEditor({
  data,
  onUpdateCompany,
  onUpdateLinks,
  onUpdateNewsletter,
  onUpdateBottom,
  onSave,
}: FooterSectionEditorProps) {
  return (
    <SectionEditor title="Footer Section" onSave={onSave}>
      <div className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h4 className="font-medium">Company Information</h4>
          <FieldEditor
            label="Logo Alt"
            value={data.company.logoAlt}
            onChange={(value) => onUpdateCompany("logoAlt", value)}
          />
          <FieldEditor
            label="Description"
            value={data.company.description}
            onChange={(value) => onUpdateCompany("description", value)}
            type="textarea"
          />
          <FieldEditor
            label="Address"
            value={data.company.address}
            onChange={(value) => onUpdateCompany("address", value)}
            type="textarea"
          />
          <div className="grid grid-cols-2 gap-4">
            <FieldEditor
              label="Phone"
              value={data.company.phone}
              onChange={(value) => onUpdateCompany("phone", value)}
            />
            <FieldEditor
              label="Email"
              value={data.company.email}
              onChange={(value) => onUpdateCompany("email", value)}
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="space-y-4">
          <h4 className="font-medium">Footer Links</h4>

          {/* Product Links */}
          <div className="space-y-2">
            <Label>Product Links</Label>
            <FieldEditor
              label="Product Section Title"
              value={data.links.product.title}
              onChange={(value) => onUpdateLinks("product", "title", value)}
            />
            <ArrayEditor<FooterLink>
              label="Product Links"
              items={data.links.product.items}
              onUpdate={(items) => onUpdateLinks("product", "items", items)}
              createNew={() => ({ label: "", href: "" })}
              renderItem={(link, index, onChange, onDelete) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <FieldEditor
                      label="Label"
                      value={link.label}
                      onChange={(value) => onChange({ ...link, label: value })}
                    />
                  </div>
                  <div className="flex-1">
                    <FieldEditor
                      label="URL"
                      value={link.href}
                      onChange={(value) => onChange({ ...link, href: value })}
                    />
                  </div>
                  <Button type="button" onClick={onDelete} variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              )}
            />
          </div>

          {/* Company Links */}
          <div className="space-y-2">
            <Label>Company Links</Label>
            <FieldEditor
              label="Company Section Title"
              value={data.links.company.title}
              onChange={(value) => onUpdateLinks("company", "title", value)}
            />
            <ArrayEditor<FooterLink>
              label="Company Links"
              items={data.links.company.items}
              onUpdate={(items) => onUpdateLinks("company", "items", items)}
              createNew={() => ({ label: "", href: "" })}
              renderItem={(link, index, onChange, onDelete) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <FieldEditor
                      label="Label"
                      value={link.label}
                      onChange={(value) => onChange({ ...link, label: value })}
                    />
                  </div>
                  <div className="flex-1">
                    <FieldEditor
                      label="URL"
                      value={link.href}
                      onChange={(value) => onChange({ ...link, href: value })}
                    />
                  </div>
                  <Button type="button" onClick={onDelete} variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              )}
            />
          </div>

          {/* Support Links */}
          <div className="space-y-2">
            <Label>Support Links</Label>
            <FieldEditor
              label="Support Section Title"
              value={data.links.support.title}
              onChange={(value) => onUpdateLinks("support", "title", value)}
            />
            <ArrayEditor<FooterLink>
              label="Support Links"
              items={data.links.support.items}
              onUpdate={(items) => onUpdateLinks("support", "items", items)}
              createNew={() => ({ label: "", href: "" })}
              renderItem={(link, index, onChange, onDelete) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <FieldEditor
                      label="Label"
                      value={link.label}
                      onChange={(value) => onChange({ ...link, label: value })}
                    />
                  </div>
                  <div className="flex-1">
                    <FieldEditor
                      label="URL"
                      value={link.href}
                      onChange={(value) => onChange({ ...link, href: value })}
                    />
                  </div>
                  <Button type="button" onClick={onDelete} variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              )}
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="font-medium">Newsletter</h4>
          <FieldEditor
            label="Newsletter Title"
            value={data.newsletter.title}
            onChange={(value) => onUpdateNewsletter("title", value)}
          />
          <FieldEditor
            label="Newsletter Description"
            value={data.newsletter.description}
            onChange={(value) => onUpdateNewsletter("description", value)}
            type="textarea"
          />
          <div className="grid grid-cols-2 gap-4">
            <FieldEditor
              label="Email Placeholder"
              value={data.newsletter.emailPlaceholder}
              onChange={(value) => onUpdateNewsletter("emailPlaceholder", value)}
            />
            <FieldEditor
              label="Subscribe Button Text"
              value={data.newsletter.subscribe}
              onChange={(value) => onUpdateNewsletter("subscribe", value)}
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="space-y-4">
          <h4 className="font-medium">Footer Bottom</h4>
          <FieldEditor
            label="Copyright Text"
            value={data.bottom.copyright}
            onChange={(value) => onUpdateBottom("copyright", value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <FieldEditor
              label="Facebook Label"
              value={data.bottom.social.facebook}
              onChange={(value) =>
                onUpdateBottom("social", {
                  ...data.bottom.social,
                  facebook: value,
                })
              }
            />
            <FieldEditor
              label="YouTube Label"
              value={data.bottom.social.youtube}
              onChange={(value) =>
                onUpdateBottom("social", {
                  ...data.bottom.social,
                  youtube: value,
                })
              }
            />
            <FieldEditor
              label="LinkedIn Label"
              value={data.bottom.social.linkedin}
              onChange={(value) =>
                onUpdateBottom("social", {
                  ...data.bottom.social,
                  linkedin: value,
                })
              }
            />
          </div>
        </div>
      </div>
    </SectionEditor>
  );
}
