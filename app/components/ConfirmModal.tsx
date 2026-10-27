// ConfirmModal.tsx
"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({
  open,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Tidak",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-sm">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={loading}
            onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="button"
            className="btn btn-error text-white"
            disabled={loading}
            onClick={onConfirm}>
            {loading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>

      {/* klik area gelap = tutup */}
      <div className="modal-backdrop" onClick={loading ? undefined : onClose} />
    </dialog>
  );
};
