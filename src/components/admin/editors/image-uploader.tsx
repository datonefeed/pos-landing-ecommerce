"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UploadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface ImageUploaderProps {
  label: string;
  currentUrl: string;
  onUpload: (url: string) => void;
  folder?: string;
  showPreview?: boolean;
}

export function ImageUploader({
  label,
  currentUrl,
  onUpload,
  folder = "images",
  showPreview = true,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();
      setPreviewUrl(result.url);
      onUpload(result.url);
      toast.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Lỗi upload: ${error}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh");
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    // Confirm upload
    await confirm({
      title: "Xác nhận upload ảnh",
      message: `Bạn có chắc chắn muốn upload ảnh "${file.name}" (${(file.size / 1024).toFixed(2)} KB)? ${currentUrl ? "Ảnh hiện tại sẽ bị thay thế." : ""}`,
      type: "info",
      confirmText: "Upload",
      cancelText: "Hủy",
      onConfirm: () => uploadFile(file),
    });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            type="text"
            value={currentUrl}
            onChange={(e) => {
              setPreviewUrl(e.target.value);
              onUpload(e.target.value);
            }}
            placeholder="URL hoặc đường dẫn ảnh"
          />
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
            size="sm"
          >
            {uploading ? (
              <>
                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>

      {showPreview && previewUrl && (
        <div className="mt-2 border rounded-lg p-2 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <ImageIcon className="h-4 w-4" />
            <span>Preview:</span>
          </div>
          {previewUrl.startsWith("http") || previewUrl.startsWith("/") ? (
            <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden">
              <Image
                src={previewUrl}
                alt={label}
                fill
                className="object-contain"
                unoptimized={previewUrl.startsWith("http")}
                onError={() => {
                  toast.error("Không thể tải ảnh preview");
                }}
              />
            </div>
          ) : (
            <div className="text-xs text-gray-500">URL không hợp lệ</div>
          )}
        </div>
      )}
      <ConfirmDialog />
    </div>
  );
}
