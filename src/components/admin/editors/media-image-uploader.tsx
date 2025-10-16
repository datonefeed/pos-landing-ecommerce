"use client";

import { ImageUploader } from "./image-uploader";
import { toast } from "sonner";

interface MediaImageUploaderProps {
  label: string;
  currentUrl: string;
  section: string;
  field?: string;
  onUpload: (url: string) => void;
  folder?: string;
  showPreview?: boolean;
}

export function MediaImageUploader({
  label,
  currentUrl,
  section,
  field,
  onUpload,
  folder = "images",
  showPreview = true,
}: MediaImageUploaderProps) {
  const handleUpload = async (url: string) => {
    // Update media.json
    try {
      const response = await fetch("/api/admin/media", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          field,
          url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update media.json");
      }

      // Call parent onUpload callback
      onUpload(url);
      toast.success("Đã cập nhật media.json");
    } catch (error) {
      console.error("Error updating media.json:", error);
      toast.error("Lỗi khi cập nhật media.json");
    }
  };

  return (
    <ImageUploader
      label={label}
      currentUrl={currentUrl}
      onUpload={handleUpload}
      folder={folder}
      showPreview={showPreview}
    />
  );
}
