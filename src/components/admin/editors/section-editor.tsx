"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, SaveIcon } from "lucide-react";

interface SectionEditorProps {
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function SectionEditor({
  title,
  children,
  onSave,
  isCollapsible = true,
  defaultCollapsed = true,
}: SectionEditorProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCollapsible && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 h-6 w-6"
            >
              {isCollapsed ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronUpIcon className="h-4 w-4" />
              )}
            </Button>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {onSave && !isCollapsed && (
          <Button type="button" onClick={onSave} size="sm" className="flex items-center gap-2">
            <SaveIcon className="h-4 w-4" />
            Lưu thay đổi
          </Button>
        )}
      </div>

      {/* Content */}
      {!isCollapsed && <div className="p-6 space-y-4">{children}</div>}
    </div>
  );
}
