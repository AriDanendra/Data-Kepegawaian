// src/components/Modal.jsx

import React from 'react';
import './Modal.css'; // Kita akan buat file CSS ini selanjutnya

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Jangan render apapun jika modal tidak terbuka
  }

  return (
    // Lapisan luar yang gelap (overlay)
    <div className="modal-overlay" onClick={onClose}>
      {/* Konten modal, event klik di sini dihentikan agar tidak menutup modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <div className="modal-body">
          {children} {/* Ini adalah bagian terpenting, tempat konten dinamis akan muncul */}
        </div>
      </div>
    </div>
  );
};

export default Modal;