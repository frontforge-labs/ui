import * as React from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className="bg-bg text-text rounded border border-border shadow-lg w-full max-w-md">
        {title && (
          <div
            id="modal-title"
            className="px-4 py-2 border-b border-border font-medium"
          >
            {title}
          </div>
        )}
        <div className="p-4">{children}</div>
        <div className="px-4 py-2 border-t border-border text-right">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-accent text-accent-foreground"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
