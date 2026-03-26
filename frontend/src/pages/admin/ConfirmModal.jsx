import React from "react";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel", intent = "danger" }) {
  if (!isOpen) return null;

  const isDanger = intent === "danger";
  const iconProps = { size: 20 };
  
  const headerColor = isDanger ? "#e53e3e" : "#3b82f6";
  const buttonBg = isDanger ? "#e53e3e" : "var(--admin-primary, #6366f1)";
  const buttonBorder = isDanger ? "#c53030" : "var(--admin-primary-hover, #4f46e5)";

  return (
    <div className="admin-modal-overlay" onClick={onCancel} style={{ zIndex: 2000 }}>
      <div 
        className="admin-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "450px" }}
      >
        <div className="admin-modal-header">
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", color: headerColor, margin: 0 }}>
            {isDanger ? <FiAlertTriangle {...iconProps} /> : <FiInfo {...iconProps} />}
            {title}
          </h3>
          <button className="admin-modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="admin-modal-body">
          <p style={{ margin: "5px 0 10px", fontSize: "0.95rem", color: "var(--admin-text-muted, #8b92b8)", lineHeight: "1.6" }}>
            {message}
          </p>
        </div>
        <div className="admin-modal-footer">
          <button 
            className="admin-btn admin-btn-secondary" 
            onClick={onCancel}
            style={{ fontWeight: "500" }}
          >
            {cancelText}
          </button>
          <button 
            className="admin-btn" 
            onClick={onConfirm}
            style={{ 
              backgroundColor: buttonBg, 
              color: "white", 
              borderColor: buttonBorder,
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
