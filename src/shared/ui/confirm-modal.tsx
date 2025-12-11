"use client";

import { Button } from "./button";
import { Modal } from "./modal";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        <div className="flex gap-3 justify-end">
          <Button onClick={onClose} disabled={isLoading} size="sm" variant="outline">
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            size="sm"
            variant={variant === "default" ? "outline" : variant}
            isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
