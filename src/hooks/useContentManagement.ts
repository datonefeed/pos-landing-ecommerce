import { useState, useEffect } from "react";
import { toast } from "sonner"; 
import type { MultilingualData } from "@/types/content";

export function useContentManagement() {
  const [data, setData] = useState<MultilingualData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/admin/content");
      const result = await response.json();
      setData(result);
      toast.success("Tải dữ liệu thành công"); 
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    if (!data) return;
    setSaving(true);

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Save failed");

      toast.success("Đã lưu thành công 🎉"); 
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, loading, saving, loadData, saveData };
}
