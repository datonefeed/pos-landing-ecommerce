"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function BackupManager() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      const response = await fetch("/api/admin/backup");
      if (!response.ok) throw new Error("Backup failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `content-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Backup created successfully!");
    } catch (error) {
      console.error("Backup error:", error);
      toast.error("Failed to create backup");
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    try {
      const fileContent = await file.text();
      const backup = JSON.parse(fileContent);

      const response = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backup),
      });

      if (!response.ok) throw new Error("Restore failed");

      toast.success("Backup restored successfully! Please refresh the page.");
    } catch (error) {
      console.error("Restore error:", error);
      toast.error("Failed to restore backup. Please check the file format.");
    } finally {
      setIsRestoring(false);
      // Reset the input
      event.target.value = "";
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Backup & Restore</h3>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Tạo Backup</Label>
          <p className="text-sm text-gray-600 mb-3">
            Tải xuống bản sao lưu của toàn bộ nội dung hiện tại
          </p>
          <Button onClick={handleBackup} disabled={isBackingUp} variant="outline">
            {isBackingUp ? "Đang tạo backup..." : "Tạo Backup"}
          </Button>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Khôi phục từ Backup
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Tải lên file backup để khôi phục nội dung trước đó
          </p>
          <Input
            type="file"
            accept=".json"
            onChange={handleRestore}
            disabled={isRestoring}
            className="cursor-pointer"
          />
          {isRestoring && <p className="text-sm text-blue-600 mt-2">Đang khôi phục...</p>}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Luôn tạo backup trước khi thực hiện thay đổi lớn</li>
                <li>Khôi phục sẽ ghi đè toàn bộ nội dung hiện tại</li>
                <li>Refresh trang sau khi khôi phục để xem thay đổi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
