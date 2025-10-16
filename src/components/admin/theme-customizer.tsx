"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Paintbrush, RefreshCwIcon } from "lucide-react";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface ThemeData {
  primary: {
    hsl: string;
    hex: string;
    name: string;
  };
  secondary?: {
    hsl: string;
    hex: string;
  };
  accent?: {
    hsl: string;
    hex: string;
  };
}

const PRESET_COLORS = [
  { name: "Blue (Default)", hex: "#0078D4", hsl: "205 100% 34%" },
  { name: "Red", hex: "#DC2626", hsl: "0 84% 51%" },
  { name: "Green", hex: "#16A34A", hsl: "142 71% 37%" },
  { name: "Purple", hex: "#9333EA", hsl: "271 81% 56%" },
  { name: "Orange", hex: "#EA580C", hsl: "20 91% 48%" },
  { name: "Pink", hex: "#EC4899", hsl: "330 81% 60%" },
  { name: "Teal", hex: "#14B8A6", hsl: "173 80% 40%" },
  { name: "Indigo", hex: "#4F46E5", hsl: "243 75% 59%" },
];

function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lValue = Math.round(l * 100);

  return `${h} ${s}% ${lValue}%`;
}

export function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customHex, setCustomHex] = useState("#0078D4");
  const { confirm, ConfirmDialog } = useConfirmDialog();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const response = await fetch("/api/admin/theme");
      const data = await response.json();
      setTheme(data);
      setCustomHex(data.primary.hex);
    } catch (error) {
      console.error("Error loading theme:", error);
      toast.error("Lỗi khi tải theme");
    } finally {
      setLoading(false);
    }
  };

  const updatePrimaryColor = async (hex: string, name: string) => {
    if (!theme) return;

    setSaving(true);
    try {
      const hsl = hexToHSL(hex);
      const updatedTheme = {
        ...theme,
        primary: {
          hsl,
          hex,
          name,
        },
      };

      const response = await fetch("/api/admin/theme", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTheme),
      });

      if (!response.ok) {
        throw new Error("Failed to update theme");
      }

      setTheme(updatedTheme);

      // Update CSS variable immediately
      document.documentElement.style.setProperty("--primary", hsl);

      toast.success(`Đã đổi màu primary thành ${name}`);
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Lỗi khi cập nhật theme");
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = async (hex: string, name: string) => {
    const confirmed = await confirm({
      title: "Xác nhận thay đổi màu",
      message: `Bạn có chắc chắn muốn đổi màu primary thành "${name}" (${hex})? Thay đổi này sẽ ảnh hưởng đến toàn bộ giao diện website.`,
      type: "info",
      confirmText: "Đổi màu",
      cancelText: "Hủy",
      onConfirm: () => updatePrimaryColor(hex, name),
    });
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomHex(hex);
  };

  const applyCustomColor = async () => {
    await handleColorChange(customHex, "Custom");
  };

  const resetToDefault = async () => {
    const confirmed = await confirm({
      title: "Xác nhận reset màu",
      message: "Bạn có chắc chắn muốn reset về màu mặc định (Blue #0078D4)?",
      type: "warning",
      confirmText: "Reset",
      cancelText: "Hủy",
      onConfirm: () => {
        updatePrimaryColor("#0078D4", "Blue (Default)");
        setCustomHex("#0078D4");
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Đang tải theme...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border rounded-lg p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Paintbrush className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Theme Customizer</h3>
        </div>

        <div className="space-y-6">
          {/* Current Color */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Label className="text-sm text-gray-600 mb-2 block">Màu Primary hiện tại</Label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: theme?.primary.hex }}
              />
              <div>
                <div className="font-semibold">{theme?.primary.name}</div>
                <div className="text-sm text-gray-600">{theme?.primary.hex}</div>
                <div className="text-xs text-gray-400">HSL: {theme?.primary.hsl}</div>
              </div>
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <Label className="mb-3 block">Chọn màu từ bộ sưu tập</Label>
            <div className="grid grid-cols-4 gap-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleColorChange(color.hex, color.name)}
                  disabled={saving}
                  className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={color.name}
                >
                  <div
                    className="w-12 h-12 rounded-lg shadow-sm border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-center">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div>
            <Label className="mb-3 block">Hoặc chọn màu tùy chỉnh</Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="color"
                  value={customHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="h-12 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  value={customHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  placeholder="#0078D4"
                  className="h-12 font-mono"
                />
              </div>
              <Button onClick={applyCustomColor} disabled={saving} className="h-12">
                {saving ? "Đang lưu..." : "Áp dụng"}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={resetToDefault} variant="outline" disabled={saving}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Reset về mặc định
            </Button>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Label className="text-sm text-gray-600 mb-3 block">Preview</Label>
            <div className="space-y-3">
              <Button className="w-full">Primary Button</Button>
              <Button variant="outline" className="w-full">
                Outline Button
              </Button>
              <div className="p-3 bg-primary text-primary-foreground rounded">
                Background with primary color
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog />
    </div>
  );
}
