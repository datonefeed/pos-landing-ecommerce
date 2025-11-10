"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { MultilingualData } from "@/types/content";

export function useSectionSave() {
  const [saving, setSaving] = useState<string | null>(null);

  const saveSection = async (
    sectionName: string,
    sectionData: unknown,
    language: "vi" | "en",
    allData: MultilingualData
  ) => {
    setSaving(sectionName);

    try {
      // Update only the specific section with current data from state
      const updatedLanguageData = {
        ...allData[language],
        [sectionName]: sectionData,
      };

      console.log("Saving section:", sectionName);
      console.log("Language:", language);
      console.log("Section data:", sectionData);
      console.log("Updated language data:", updatedLanguageData);

      // Save updated data - send both vi and en completely
      const saveResponse = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vi: language === "vi" ? updatedLanguageData : allData.vi,
          en: language === "en" ? updatedLanguageData : allData.en,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save section");
      }

      toast.success(`${sectionName} đã được lưu thành công!`);
    } catch (error) {
      console.error("Error saving section:", error);
      toast.error(`Lỗi khi lưu ${sectionName}: ${error}`);
    } finally {
      setSaving(null);
    }
  };

  return {
    saving,
    saveSection,
  };
}