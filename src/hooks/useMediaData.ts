"use client";

import { useState, useEffect } from "react";

export function useMediaData() {
  const [media, setMedia] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch("/api/admin/media");
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error("Error loading media:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMedia = async (section: string, field: string | undefined, url: string) => {
    try {
      const response = await fetch("/api/admin/media", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, field, url }),
      });

      if (!response.ok) {
        throw new Error("Failed to update media");
      }

      // Reload media data
      await loadMedia();
    } catch (error) {
      console.error("Error updating media:", error);
      throw error;
    }
  };

  const getMediaUrl = (section: string, field?: string): string => {
    if (!section) return "";
    
    if (field) {
      return media[section]?.[field] || "";
    }
    return media[section] || "";
  };

  return { media, loading, updateMedia, getMediaUrl, reloadMedia: loadMedia };
}
