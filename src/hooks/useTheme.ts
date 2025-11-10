"use client";

import { useEffect } from "react";

export function useTheme() {
  useEffect(() => {
    // Load theme from server and apply to CSS variables
    const loadTheme = async () => {
      try {
        const response = await fetch("/api/admin/theme");
        const data = await response.json();
        
        if (data?.primary?.hsl) {
          document.documentElement.style.setProperty("--primary", data.primary.hsl);
        }
        
        if (data?.secondary?.hsl) {
          document.documentElement.style.setProperty("--secondary", data.secondary.hsl);
        }
        
        if (data?.accent?.hsl) {
          document.documentElement.style.setProperty("--accent", data.accent.hsl);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();
  }, []);
}
