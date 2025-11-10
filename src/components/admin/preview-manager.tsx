"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PreviewManager() {
  const [previewLanguage, setPreviewLanguage] = useState<"vi" | "en">("vi");

  const openPreview = () => {
    const url = `/${previewLanguage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Xem trước Landing Page</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Chọn ngôn ngữ xem trước
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="vi"
                checked={previewLanguage === "vi"}
                onChange={(e) => setPreviewLanguage(e.target.value as "vi")}
                className="mr-2"
              />
              Tiếng Việt
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="en"
                checked={previewLanguage === "en"}
                onChange={(e) => setPreviewLanguage(e.target.value as "en")}
                className="mr-2"
              />
              Tiếng Anh
            </label>
          </div>
        </div>

        <Button onClick={openPreview} className="w-full">
          Mở xem trước trong tab mới
        </Button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Hướng dẫn</h3>
            <div className="mt-2 text-sm text-green-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Lưu thay đổi trước khi xem trước</li>
                <li>Refresh trang xem trước để thấy thay đổi mới nhất</li>
                <li>Kiểm tra trên nhiều thiết bị khác nhau</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
