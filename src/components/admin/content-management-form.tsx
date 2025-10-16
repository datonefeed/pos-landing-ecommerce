"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContentManagement } from "@/hooks/useContentManagement";
import { useSectionSave } from "@/hooks/useSectionSave";
import BackupManager from "@/components/admin/backup-manager";
import SearchAndReplace from "@/components/admin/search-and-replace";
import PreviewManager from "@/components/admin/preview-manager";
import { ThemeCustomizer } from "@/components/admin/theme-customizer";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { HeaderSection } from "@/components/admin/sections/header-section";
import { HeroSectionEditor } from "@/components/admin/sections/hero-section";
import { FeaturesSectionEditor } from "@/components/admin/sections/features-section";
import { PricingSectionEditor } from "@/components/admin/sections/pricing-section";
import { ProductShowcaseSection } from "@/components/admin/sections/product-showcase-section";
import { TestimonialsSectionEditor } from "@/components/admin/sections/testimonials-section";
import { NewsSectionEditor } from "@/components/admin/sections/news-section";
import { FooterSectionEditor } from "@/components/admin/sections/footer-section";
import type { ContentData, MultilingualData } from "@/types/content";

interface LanguageEditorProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
  language: "vi" | "en";
  getAllData: () => MultilingualData;
}

function LanguageEditor({ data, onChange, language, getAllData }: LanguageEditorProps) {
  const { saveSection } = useSectionSave();
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
      <HeaderSection
        data={data.Header}
        onUpdate={(field, subfield, value) =>
          updateNestedField("Header", field as keyof typeof data.Header, { [subfield]: value })
        }
        onSave={() => saveSection("Header", data.Header, language, getAllData())}
      />

      {/* Hero Section */}
      <HeroSectionEditor
        data={data.HeroSection}
        onUpdate={(field, subfield, value) =>
          updateNestedField("HeroSection", field as keyof typeof data.HeroSection, {
            [subfield]: value,
          })
        }
        onSave={() => saveSection("HeroSection", data.HeroSection, language, getAllData())}
      />

      {/* Features Section */}
      <FeaturesSectionEditor
        data={data.FeaturesSection}
        onUpdateContent={(field, value) =>
          updateNestedField("FeaturesSection", "content", { [field]: value })
        }
        onUpdateFeatures={(features) => updateSection("FeaturesSection", { features })}
        onSave={() => saveSection("FeaturesSection", data.FeaturesSection, language, getAllData())}
      />

      {/* Pricing Section */}
      <PricingSectionEditor
        data={data.PricingSection}
        onUpdateContent={(field, value) =>
          updateNestedField("PricingSection", "content", { [field]: value })
        }
        onUpdatePlans={(plans) => updateSection("PricingSection", { plans })}
        onSave={() => saveSection("PricingSection", data.PricingSection, language, getAllData())}
      />

      {/* Product Showcase */}
      <ProductShowcaseSection
        data={data.ProductShowcase}
        onUpdate={(field, subfield, value) =>
          updateNestedField("ProductShowcase", field as keyof typeof data.ProductShowcase, {
            [subfield]: value,
          })
        }
        onSave={() => saveSection("ProductShowcase", data.ProductShowcase, language, getAllData())}
      />

      {/* Testimonials Section */}
      <TestimonialsSectionEditor
        data={data.TestimonialsSection}
        onUpdate={(field, value) =>
          updateNestedField("TestimonialsSection", "content", { [field]: value })
        }
        onSave={() =>
          saveSection("TestimonialsSection", data.TestimonialsSection, language, getAllData())
        }
      />

      {/* News Section */}
      <NewsSectionEditor
        data={data.NewsSection}
        onUpdate={(field, subfield, value) =>
          updateNestedField("NewsSection", field as keyof typeof data.NewsSection, {
            [subfield]: value,
          })
        }
        onSave={() => saveSection("NewsSection", data.NewsSection, language, getAllData())}
      />

      {/* Footer Section */}
      <FooterSectionEditor
        data={data.Footer}
        onUpdateCompany={(field, value) =>
          updateNestedField("Footer", "company", { [field]: value })
        }
        onUpdateLinks={(section, field, value) =>
          updateNestedField("Footer", "links", {
            [section]: {
              ...data.Footer.links[section as keyof typeof data.Footer.links],
              [field]: value,
            },
          })
        }
        onUpdateNewsletter={(field, value) =>
          updateNestedField("Footer", "newsletter", { [field]: value })
        }
        onUpdateBottom={(field, value) => updateNestedField("Footer", "bottom", { [field]: value })}
        onSave={() => saveSection("Footer", data.Footer, language, getAllData())}
      />
    </div>
  );
}

export default function ContentManagementForm() {
  const { data, setData, loading, saving, saveData } = useContentManagement();
  const [activeTab, setActiveTab] = useState("vi");
  const { confirm, ConfirmDialog } = useConfirmDialog();

  // Search and replace function
  const handleSearchReplace = async (
    searchTerm: string,
    replaceTerm: string,
    language: "vi" | "en" | "both"
  ) => {
    if (!data) return;

    const searchAndReplaceInObject = (obj: unknown): unknown => {
      if (typeof obj === "string") {
        return obj.replace(new RegExp(searchTerm, "g"), replaceTerm);
      }
      if (Array.isArray(obj)) {
        return obj.map(searchAndReplaceInObject);
      }
      if (obj && typeof obj === "object") {
        const newObj: Record<string, unknown> = {};
        for (const key in obj as Record<string, unknown>) {
          newObj[key] = searchAndReplaceInObject((obj as Record<string, unknown>)[key]);
        }
        return newObj;
      }
      return obj;
    };

    const newData = { ...data };

    if (language === "vi" || language === "both") {
      newData.vi = searchAndReplaceInObject(data.vi) as ContentData;
    }

    if (language === "en" || language === "both") {
      newData.en = searchAndReplaceInObject(data.en) as ContentData;
    }

    setData(newData);
  };

  const handleSaveAll = async () => {
    await confirm({
      title: "Xác nhận lưu tất cả thay đổi",
      message:
        "Bạn có chắc chắn muốn lưu TẤT CẢ thay đổi hiện tại? Thao tác này sẽ cập nhật file nội dung cho cả 2 ngôn ngữ.",
      type: "warning",
      confirmText: "Lưu tất cả",
      cancelText: "Hủy",
      onConfirm: saveData,
    });
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
            <Button onClick={handleSaveAll} disabled={saving} size="lg">
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
            <TabsTrigger value="en">Tiếng Anh</TabsTrigger>
            <TabsTrigger value="tools">Công cụ</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="vi" className="mt-6">
            <LanguageEditor
              data={data.vi}
              onChange={(newData) => setData({ ...data, vi: newData })}
              language="vi"
              getAllData={() => data}
            />
          </TabsContent>

          <TabsContent value="en" className="mt-6">
            <LanguageEditor
              data={data.en}
              onChange={(newData) => setData({ ...data, en: newData })}
              language="en"
              getAllData={() => data}
            />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="space-y-6">
              <ThemeCustomizer />
              <SearchAndReplace onSearchReplace={handleSearchReplace} />
              <PreviewManager />
            </div>
          </TabsContent>

          <TabsContent value="backup" className="mt-6">
            <BackupManager />
          </TabsContent>
        </Tabs>
      </div>
      <ConfirmDialog />
    </div>
  );
}
