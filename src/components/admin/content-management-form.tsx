"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContentManagement } from "@/hooks/useContentManagement";
import BackupManager from "@/components/admin/backup-manager";
import SearchAndReplace from "@/components/admin/search-and-replace";
import PreviewManager from "@/components/admin/preview-manager";
import type { ContentData, Feature, Plan, SupportAccordionItem, FooterLink } from "@/types/content";

interface SectionEditorProps {
  title: string;
  children: React.ReactNode;
}

function SectionEditor({ title, children }: SectionEditorProps) {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

interface FieldEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "input" | "textarea";
  placeholder?: string;
}

function FieldEditor({ label, value, onChange, type = "input", placeholder }: FieldEditorProps) {
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

interface ArrayEditorProps<T> {
  label: string;
  items: T[];
  onUpdate: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    onChange: (item: T) => void,
    onDelete: () => void
  ) => React.ReactNode;
  createNew: () => T;
}

function ArrayEditor<T>({ label, items, onUpdate, renderItem, createNew }: ArrayEditorProps<T>) {
  const handleItemChange = (index: number, newItem: T) => {
    const newItems = [...items];
    newItems[index] = newItem;
    onUpdate(newItems);
  };

  const handleAddItem = () => {
    onUpdate([...items, createNew()]);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <Button type="button" onClick={handleAddItem} size="sm">
          Thêm mới
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) =>
          renderItem(
            item,
            index,
            (newItem) => handleItemChange(index, newItem),
            () => handleDeleteItem(index)
          )
        )}
      </div>
    </div>
  );
}

interface LanguageEditorProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

function LanguageEditor({ data, onChange }: LanguageEditorProps) {
  const updateSection = <K extends keyof ContentData>(
    section: K,
    updates: Partial<ContentData[K]>
  ) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        ...updates,
      },
    });
  };

  const updateNestedField = <K extends keyof ContentData, T extends keyof ContentData[K]>(
    section: K,
    field: T,
    updates: Partial<ContentData[K][T]>
  ) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: {
          ...data[section][field],
          ...updates,
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <SectionEditor title="Header">
        <div className="grid grid-cols-2 gap-4">
          <FieldEditor
            label="Features Nav"
            value={data.Header.nav.features}
            onChange={(value) => updateNestedField("Header", "nav", { features: value })}
          />
          <FieldEditor
            label="Pricing Nav"
            value={data.Header.nav.pricing}
            onChange={(value) => updateNestedField("Header", "nav", { pricing: value })}
          />
          <FieldEditor
            label="Solutions Nav"
            value={data.Header.nav.solutions}
            onChange={(value) => updateNestedField("Header", "nav", { solutions: value })}
          />
          <FieldEditor
            label="Support Nav"
            value={data.Header.nav.support}
            onChange={(value) => updateNestedField("Header", "nav", { support: value })}
          />
          <FieldEditor
            label="News Nav"
            value={data.Header.nav.news}
            onChange={(value) => updateNestedField("Header", "nav", { news: value })}
          />
          <FieldEditor
            label="About Us Nav"
            value={data.Header.nav.aboutUs}
            onChange={(value) => updateNestedField("Header", "nav", { aboutUs: value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FieldEditor
            label="Sign Up CTA"
            value={data.Header.cta.signUp}
            onChange={(value) => updateNestedField("Header", "cta", { signUp: value })}
          />
          <FieldEditor
            label="Sign In CTA"
            value={data.Header.cta.signIn}
            onChange={(value) => updateNestedField("Header", "cta", { signIn: value })}
          />
        </div>
      </SectionEditor>

      {/* Hero Section */}
      <SectionEditor title="Hero Section">
        <FieldEditor
          label="Title"
          value={data.HeroSection.content.title}
          onChange={(value) => updateNestedField("HeroSection", "content", { title: value })}
          type="textarea"
        />
        <FieldEditor
          label="Description"
          value={data.HeroSection.content.description}
          onChange={(value) => updateNestedField("HeroSection", "content", { description: value })}
          type="textarea"
        />
        <div className="grid grid-cols-2 gap-4">
          <FieldEditor
            label="Free Trial CTA"
            value={data.HeroSection.cta.freeTrial}
            onChange={(value) => updateNestedField("HeroSection", "cta", { freeTrial: value })}
          />
          <FieldEditor
            label="Watch Video CTA"
            value={data.HeroSection.cta.watchVideo}
            onChange={(value) => updateNestedField("HeroSection", "cta", { watchVideo: value })}
          />
        </div>
      </SectionEditor>

      {/* Features Section */}
      <SectionEditor title="Features Section">
        <FieldEditor
          label="Title"
          value={data.FeaturesSection.content.title}
          onChange={(value) => updateNestedField("FeaturesSection", "content", { title: value })}
        />
        <FieldEditor
          label="Description"
          value={data.FeaturesSection.content.description}
          onChange={(value) =>
            updateNestedField("FeaturesSection", "content", { description: value })
          }
          type="textarea"
        />

        <ArrayEditor<Feature>
          label="Features"
          items={data.FeaturesSection.features}
          onUpdate={(features) => updateSection("FeaturesSection", { features })}
          createNew={() => ({ step: "", title: "", content: "", image: "" })}
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
              <FieldEditor
                label="Image URL"
                value={feature.image}
                onChange={(value) => onChange({ ...feature, image: value })}
              />
            </div>
          )}
        />
      </SectionEditor>

      {/* Pricing Section */}
      <SectionEditor title="Pricing Section">
        <FieldEditor
          label="Title"
          value={data.PricingSection.content.title}
          onChange={(value) => updateNestedField("PricingSection", "content", { title: value })}
        />

        <ArrayEditor<Plan>
          label="Pricing Plans"
          items={data.PricingSection.plans}
          onUpdate={(plans) => updateSection("PricingSection", { plans })}
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

      {/* Product Showcase */}
      <SectionEditor title="Product Showcase">
        <FieldEditor
          label="Title"
          value={data.ProductShowcase.content.title}
          onChange={(value) => updateNestedField("ProductShowcase", "content", { title: value })}
        />
        <FieldEditor
          label="Description"
          value={data.ProductShowcase.content.description}
          onChange={(value) =>
            updateNestedField("ProductShowcase", "content", { description: value })
          }
          type="textarea"
        />
        <div className="grid grid-cols-2 gap-4">
          <FieldEditor
            label="Video Title"
            value={data.ProductShowcase.video.title}
            onChange={(value) => updateNestedField("ProductShowcase", "video", { title: value })}
          />
          <FieldEditor
            label="Video Description"
            value={data.ProductShowcase.video.description}
            onChange={(value) =>
              updateNestedField("ProductShowcase", "video", { description: value })
            }
          />
        </div>
      </SectionEditor>

      {/* Support Section */}
      <SectionEditor title="Support Section">
        <FieldEditor
          label="Title"
          value={data.SupportSection.content.title}
          onChange={(value) => updateNestedField("SupportSection", "content", { title: value })}
        />
        <FieldEditor
          label="Description"
          value={data.SupportSection.content.description}
          onChange={(value) =>
            updateNestedField("SupportSection", "content", { description: value })
          }
          type="textarea"
        />
        <FieldEditor
          label="Form Title"
          value={data.SupportSection.content.formTitle}
          onChange={(value) => updateNestedField("SupportSection", "content", { formTitle: value })}
        />

        <ArrayEditor<SupportAccordionItem>
          label="Support Accordion Items"
          items={data.SupportSection.accordion}
          onUpdate={(accordion) => updateSection("SupportSection", { accordion })}
          createNew={() => ({ id: Date.now(), title: "", imageUrl: "" })}
          renderItem={(item, index, onChange, onDelete) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Support Item {index + 1}</h4>
                <Button type="button" onClick={onDelete} variant="destructive" size="sm">
                  Xóa
                </Button>
              </div>
              <FieldEditor
                label="Title"
                value={item.title}
                onChange={(value) => onChange({ ...item, title: value })}
              />
              <FieldEditor
                label="Image URL"
                value={item.imageUrl}
                onChange={(value) => onChange({ ...item, imageUrl: value })}
              />
            </div>
          )}
        />

        <div className="space-y-4">
          <h4 className="font-medium">Contact Form Labels</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FieldEditor
                label="Name Label"
                value={data.SupportSection.form.name.label}
                onChange={(value) =>
                  updateNestedField("SupportSection", "form", {
                    name: { ...data.SupportSection.form.name, label: value },
                  })
                }
              />
              <FieldEditor
                label="Name Placeholder"
                value={data.SupportSection.form.name.placeholder}
                onChange={(value) =>
                  updateNestedField("SupportSection", "form", {
                    name: { ...data.SupportSection.form.name, placeholder: value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <FieldEditor
                label="Email Label"
                value={data.SupportSection.form.email.label}
                onChange={(value) =>
                  updateNestedField("SupportSection", "form", {
                    email: { ...data.SupportSection.form.email, label: value },
                  })
                }
              />
              <FieldEditor
                label="Email Placeholder"
                value={data.SupportSection.form.email.placeholder}
                onChange={(value) =>
                  updateNestedField("SupportSection", "form", {
                    email: { ...data.SupportSection.form.email, placeholder: value },
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <FieldEditor
              label="Message Label"
              value={data.SupportSection.form.message.label}
              onChange={(value) =>
                updateNestedField("SupportSection", "form", {
                  message: { ...data.SupportSection.form.message, label: value },
                })
              }
            />
            <FieldEditor
              label="Message Placeholder"
              value={data.SupportSection.form.message.placeholder}
              onChange={(value) =>
                updateNestedField("SupportSection", "form", {
                  message: { ...data.SupportSection.form.message, placeholder: value },
                })
              }
            />
          </div>
          <FieldEditor
            label="Submit Button Text"
            value={data.SupportSection.form.submit}
            onChange={(value) => updateNestedField("SupportSection", "form", { submit: value })}
          />
        </div>
      </SectionEditor>

      {/* Testimonials Section */}
      <SectionEditor title="Testimonials Section">
        <FieldEditor
          label="Title"
          value={data.TestimonialsSection.content.title}
          onChange={(value) =>
            updateNestedField("TestimonialsSection", "content", { title: value })
          }
        />
        <FieldEditor
          label="Description"
          value={data.TestimonialsSection.content.description}
          onChange={(value) =>
            updateNestedField("TestimonialsSection", "content", { description: value })
          }
          type="textarea"
        />
      </SectionEditor>

      {/* News Section */}
      <SectionEditor title="News Section">
        <FieldEditor
          label="Title"
          value={data.NewsSection.content.title}
          onChange={(value) => updateNestedField("NewsSection", "content", { title: value })}
        />
        <FieldEditor
          label="Read More CTA"
          value={data.NewsSection.cta.readMore}
          onChange={(value) => updateNestedField("NewsSection", "cta", { readMore: value })}
        />
      </SectionEditor>

      {/* Footer Section */}
      <SectionEditor title="Footer Section">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Company Information</h4>
            <FieldEditor
              label="Logo Alt"
              value={data.Footer.company.logoAlt}
              onChange={(value) => updateNestedField("Footer", "company", { logoAlt: value })}
            />
            <FieldEditor
              label="Description"
              value={data.Footer.company.description}
              onChange={(value) => updateNestedField("Footer", "company", { description: value })}
              type="textarea"
            />
            <FieldEditor
              label="Address"
              value={data.Footer.company.address}
              onChange={(value) => updateNestedField("Footer", "company", { address: value })}
              type="textarea"
            />
            <div className="grid grid-cols-2 gap-4">
              <FieldEditor
                label="Phone"
                value={data.Footer.company.phone}
                onChange={(value) => updateNestedField("Footer", "company", { phone: value })}
              />
              <FieldEditor
                label="Email"
                value={data.Footer.company.email}
                onChange={(value) => updateNestedField("Footer", "company", { email: value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Footer Links</h4>

            {/* Product Links */}
            <div className="space-y-2">
              <Label>Product Links</Label>
              <FieldEditor
                label="Product Section Title"
                value={data.Footer.links.product.title}
                onChange={(value) =>
                  updateNestedField("Footer", "links", {
                    product: { ...data.Footer.links.product, title: value },
                  })
                }
              />
              <ArrayEditor<FooterLink>
                label="Product Links"
                items={data.Footer.links.product.items}
                onUpdate={(items) =>
                  updateNestedField("Footer", "links", {
                    product: { ...data.Footer.links.product, items },
                  })
                }
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
                value={data.Footer.links.company.title}
                onChange={(value) =>
                  updateNestedField("Footer", "links", {
                    company: { ...data.Footer.links.company, title: value },
                  })
                }
              />
              <ArrayEditor<FooterLink>
                label="Company Links"
                items={data.Footer.links.company.items}
                onUpdate={(items) =>
                  updateNestedField("Footer", "links", {
                    company: { ...data.Footer.links.company, items },
                  })
                }
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
                value={data.Footer.links.support.title}
                onChange={(value) =>
                  updateNestedField("Footer", "links", {
                    support: { ...data.Footer.links.support, title: value },
                  })
                }
              />
              <ArrayEditor<FooterLink>
                label="Support Links"
                items={data.Footer.links.support.items}
                onUpdate={(items) =>
                  updateNestedField("Footer", "links", {
                    support: { ...data.Footer.links.support, items },
                  })
                }
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

          <div className="space-y-4">
            <h4 className="font-medium">Newsletter</h4>
            <FieldEditor
              label="Newsletter Title"
              value={data.Footer.newsletter.title}
              onChange={(value) => updateNestedField("Footer", "newsletter", { title: value })}
            />
            <FieldEditor
              label="Newsletter Description"
              value={data.Footer.newsletter.description}
              onChange={(value) =>
                updateNestedField("Footer", "newsletter", { description: value })
              }
              type="textarea"
            />
            <div className="grid grid-cols-2 gap-4">
              <FieldEditor
                label="Email Placeholder"
                value={data.Footer.newsletter.emailPlaceholder}
                onChange={(value) =>
                  updateNestedField("Footer", "newsletter", { emailPlaceholder: value })
                }
              />
              <FieldEditor
                label="Subscribe Button Text"
                value={data.Footer.newsletter.subscribe}
                onChange={(value) =>
                  updateNestedField("Footer", "newsletter", { subscribe: value })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Footer Bottom</h4>
            <FieldEditor
              label="Copyright Text"
              value={data.Footer.bottom.copyright}
              onChange={(value) => updateNestedField("Footer", "bottom", { copyright: value })}
            />
            <div className="grid grid-cols-3 gap-4">
              <FieldEditor
                label="Facebook Label"
                value={data.Footer.bottom.social.facebook}
                onChange={(value) =>
                  updateNestedField("Footer", "bottom", {
                    social: { ...data.Footer.bottom.social, facebook: value },
                  })
                }
              />
              <FieldEditor
                label="YouTube Label"
                value={data.Footer.bottom.social.youtube}
                onChange={(value) =>
                  updateNestedField("Footer", "bottom", {
                    social: { ...data.Footer.bottom.social, youtube: value },
                  })
                }
              />
              <FieldEditor
                label="LinkedIn Label"
                value={data.Footer.bottom.social.linkedin}
                onChange={(value) =>
                  updateNestedField("Footer", "bottom", {
                    social: { ...data.Footer.bottom.social, linkedin: value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </SectionEditor>
    </div>
  );
}

export default function ContentManagementForm() {
  const { data, setData, loading, saving, saveData } = useContentManagement();
  const [activeTab, setActiveTab] = useState("vi");

  // Search and replace function
  const handleSearchReplace = (
    searchTerm: string,
    replaceTerm: string,
    language: "vi" | "en" | "both"
  ) => {
    if (!data) return;

    const searchAndReplaceInObject = (obj: any): any => {
      if (typeof obj === "string") {
        return obj.replace(new RegExp(searchTerm, "g"), replaceTerm);
      }
      if (Array.isArray(obj)) {
        return obj.map(searchAndReplaceInObject);
      }
      if (obj && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
          newObj[key] = searchAndReplaceInObject(obj[key]);
        }
        return newObj;
      }
      return obj;
    };

    const newData = { ...data };

    if (language === "vi" || language === "both") {
      newData.vi = searchAndReplaceInObject(data.vi);
    }

    if (language === "en" || language === "both") {
      newData.en = searchAndReplaceInObject(data.en);
    }

    setData(newData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Không thể tải dữ liệu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý nội dung Landing Page</h1>
              <p className="mt-2 text-gray-600">Chỉnh sửa nội dung cho các ngôn ngữ khác nhau</p>
            </div>
            <Button onClick={saveData} disabled={saving} size="lg">
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="tools">Công cụ</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="vi" className="mt-6">
            <LanguageEditor
              data={data.vi}
              onChange={(newData) => setData({ ...data, vi: newData })}
            />
          </TabsContent>

          <TabsContent value="en" className="mt-6">
            <LanguageEditor
              data={data.en}
              onChange={(newData) => setData({ ...data, en: newData })}
            />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="space-y-6">
              <SearchAndReplace onSearchReplace={handleSearchReplace} />
              <PreviewManager />
            </div>
          </TabsContent>

          <TabsContent value="backup" className="mt-6">
            <BackupManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
