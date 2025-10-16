"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export type ConfirmationType = "warning" | "danger" | "info" | "success";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: ConfirmationType;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    confirmBg: "bg-yellow-600 hover:bg-yellow-700",
  },
  danger: {
    icon: XCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    confirmBg: "bg-red-600 hover:bg-red-700",
  },
  info: {
    icon: AlertCircle,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    confirmBg: "bg-blue-600 hover:bg-blue-700",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    confirmBg: "bg-green-600 hover:bg-green-700",
  },
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  type = "warning",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Icon */}
        <div className={`${config.bgColor} p-6 flex justify-center`}>
          <div className={`${config.iconColor}`}>
            <Icon className="h-16 w-16" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
          <p className="text-gray-600 text-center mb-6">{message}</p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={onCancel} variant="outline" className="flex-1" disabled={loading}>
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={`flex-1 ${config.confirmBg} text-white`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook để sử dụng confirm dialog dễ dàng hơn
export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    message: string;
    type: ConfirmationType;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
  }>({
    title: "",
    message: "",
    type: "warning",
    onConfirm: () => {},
  });
  const [loading, setLoading] = useState(false);

  const confirm = (
    options: Omit<typeof config, "onConfirm"> & {
      onConfirm: () => void | Promise<void>;
    }
  ) => {
    return new Promise<boolean>((resolve) => {
      setConfig({
        ...options,
        onConfirm: async () => {
          setLoading(true);
          try {
            await options.onConfirm();
            resolve(true);
            setIsOpen(false);
          } catch (error) {
            console.error("Confirm action error:", error);
            resolve(false);
          } finally {
            setLoading(false);
          }
        },
      });
      setIsOpen(true);
    });
  };

  const handleCancel = () => {
    if (!loading) {
      setIsOpen(false);
    }
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      isOpen={isOpen}
      title={config.title}
      message={config.message}
      type={config.type}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
      onConfirm={config.onConfirm}
      onCancel={handleCancel}
      loading={loading}
    />
  );

  return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
