"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchAndReplaceProps {
  onSearchReplace: (
    searchTerm: string,
    replaceTerm: string,
    language: "vi" | "en" | "both"
  ) => void;
}

export default function SearchAndReplace({ onSearchReplace }: SearchAndReplaceProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [language, setLanguage] = useState<"vi" | "en" | "both">("both");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && replaceTerm.trim()) {
      onSearchReplace(searchTerm, replaceTerm, language);
      setSearchTerm("");
      setReplaceTerm("");
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Tìm kiếm & Thay thế</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="search">Tìm kiếm</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập từ cần tìm"
            />
          </div>
          <div>
            <Label htmlFor="replace">Thay thế bằng</Label>
            <Input
              id="replace"
              value={replaceTerm}
              onChange={(e) => setReplaceTerm(e.target.value)}
              placeholder="Nhập từ thay thế"
            />
          </div>
        </div>

        <div>
          <Label>Ngôn ngữ</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="both"
                checked={language === "both"}
                onChange={(e) => setLanguage(e.target.value as "both")}
                className="mr-2"
              />
              Cả hai
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="vi"
                checked={language === "vi"}
                onChange={(e) => setLanguage(e.target.value as "vi")}
                className="mr-2"
              />
              Tiếng Việt
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="en"
                checked={language === "en"}
                onChange={(e) => setLanguage(e.target.value as "en")}
                className="mr-2"
              />
              English
            </label>
          </div>
        </div>

        <Button type="submit" disabled={!searchTerm.trim() || !replaceTerm.trim()}>
          Thay thế tất cả
        </Button>
      </form>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-blue-700">
          <strong>Lưu ý:</strong> Chức năng này sẽ tìm và thay thế tất cả các chuỗi phù hợp trong
          nội dung. Hãy cẩn thận khi sử dụng và luôn tạo backup trước.
        </p>
      </div>
    </div>
  );
}
