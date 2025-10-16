"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

export default function BackupManager() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const createBackup = async () => {
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

  const handleBackup = async () => {
    await confirm({
      title: "Xác nhận tạo backup",
      message:
        "Bạn có chắc chắn muốn tạo file backup cho toàn bộ nội dung hiện tại? File sẽ được tải về máy tính của bạn.",
      type: "info",
      confirmText: "Tạo Backup",
      cancelText: "Hủy",
      onConfirm: createBackup,
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRestoreFile(file);
      toast.info(`Đã chọn file: ${file.name}`);
    }
  };

  const restoreBackup = async () => {
    if (!restoreFile) return;

    setIsRestoring(true);
    try {
      const fileContent = await restoreFile.text();
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
      setRestoreFile(null);
    }
  };

  const handleRestore = async () => {
    if (!restoreFile) {
      toast.error("Vui lòng chọn file backup trước!");
      return;
    }

    await confirm({
      title: "⚠️ Cảnh báo: Khôi phục Backup",
      message: `Bạn có chắc chắn muốn khôi phục từ file "${restoreFile.name}"? Toàn bộ nội dung hiện tại sẽ BỊ GHI ĐÈ và KHÔNG THỂ HOÀN TÁC!`,
      type: "danger",
      confirmText: "Khôi phục",
      cancelText: "Hủy",
      onConfirm: restoreBackup,
    });
  };

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Backup & Restore</h3>

      <div className="space-y-4">
        {/* Backup Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Tạo Backup</Label>
          <p className="text-sm text-gray-600 mb-3">
            Tải xuống bản sao lưu của toàn bộ nội dung hiện tại
          </p>
          <Button onClick={handleBackup} disabled={isBackingUp} variant="outline">
            {isBackingUp ? "Đang tạo backup..." : "Tạo Backup"}
          </Button>
        </div>

        {/* Restore Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Khôi phục từ Backup
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Chọn file backup rồi bấm "Khôi phục Backup" để khôi phục nội dung trước đó
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Input
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              disabled={isRestoring}
              className="cursor-pointer sm:w-1/2"
            />
            <Button
              onClick={handleRestore}
              disabled={isRestoring || !restoreFile}
              variant="default"
            >
              {isRestoring ? "Đang khôi phục..." : "Khôi phục Backup"}
            </Button>
          </div>

          {restoreFile && !isRestoring && (
            <p className="text-sm text-green-600 mt-2">
              File đã chọn: <strong>{restoreFile.name}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Warning Box */}
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
      <ConfirmDialog />
    </div>
  );
}
